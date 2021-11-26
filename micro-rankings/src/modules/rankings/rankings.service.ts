import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from './interfaces/partida.interface';
import { Ranking } from './interfaces/ranking.schema';
import { ClientProxySmartRanking } from '../proxyrmq/client-proxy';
import { Categoria } from './interfaces/categoria.interface';
import { EventoNome } from './evento-nome.enum';
import { RankingResponse } from './interfaces/ranking-response.interface';
import * as momentTimezone from 'moment-timezone';

@Injectable()
export class RankingsService {
  constructor(
    @InjectModel('Ranking')
    private readonly desafioModel: Model<Ranking>,
    private clientProxySmartRanking: ClientProxySmartRanking,
  ) {}

  private readonly logger = new Logger(RankingsService.name);

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  async processarPartida(idPartida: string, partida: Partida): Promise<void> {
    try {
      const categoria: Categoria = await this.clientAdminBackend
        .send('consultar-categorias', partida.categoria)
        .toPromise();

      await Promise.all(
        partida.jogadores.map(async (jogador) => {
          const ranking = new this.desafioModel();

          ranking.categoria = partida.categoria;
          ranking.desafio = partida.desafio;
          ranking.partida = idPartida;
          ranking.jogador = jogador;

          if (jogador == partida.def) {
            const eventoFilter = categoria.eventos.filter(
              (evento) => evento.nome == EventoNome.VITORIA,
            );

            ranking.evento = EventoNome.VITORIA;
            ranking.operacao = eventoFilter[0].operacao;
            ranking.pontos = eventoFilter[0].valor;
          } else {
            const eventoFilter = categoria.eventos.filter(
              (evento) => evento.nome == EventoNome.DERROTA,
            );

            ranking.evento = EventoNome.DERROTA;
            ranking.operacao = eventoFilter[0].operacao;
            ranking.pontos = eventoFilter[0].valor;
          }

          this.logger.log(`ranking: ${JSON.stringify(ranking)}`);
          await ranking.save();
        }),
      );
    } catch (error) {
      this.logger.error(`error: ${error}`);
      throw new RpcException(error.message);
    }
  }

  async consultarRankings(
    idCategoria: string,
    dataRef: string,
  ): Promise<RankingResponse[]> {
    try {
      this.logger.log(`idCategoria: ${idCategoria}, dataRef: ${dataRef}`);

      if (!dataRef) {
        dataRef = momentTimezone().tz('America/Sao_Paulo').format('YYYY-MM-DD');
        this.logger.log(`dataRef: ${dataRef}`);
      }

      // Registros de partidas processadas,
      // filtrando a categoria recebida
      const registroRankings = await this.desafioModel
        .find()
        .where('categoria')
        .equals(idCategoria)
        .exec();

      /*
       Recuperar todos os desafios com data menor ou igual à
       data que recebemos na requisição, somente iremos recuperar desafios 
       com status 'REALIZADO' e filtrando a categoria
       */
      const desafios: Desafio[] = [];

      return;
      this.logger.log(`registroRankings: ${registroRankings}`);
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
