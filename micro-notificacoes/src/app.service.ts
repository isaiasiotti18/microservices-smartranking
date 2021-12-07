import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Desafio } from './interfaces/desafio.interface';
import { Jogador } from './interfaces/jogador.interface';
import { ClientProxySmartRanking } from './proxyrmq/client-proxy';
import HTML_NOTIFICACAO_ADVERSARIO from './static/html-notificacao-adversario';

@Injectable()
export class AppService {
  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking,
    private readonly mailerService: MailerService,
  ) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  private readonly logger = new Logger(AppService.name);

  async enviarEmailParaAdversario(desafio: Desafio): Promise<void> {
    try {
      /**
       Identificar o ID do Adversario 
      */
      let idAdversario = '';

      desafio.jogadores.map((jogador) => {
        if (jogador != desafio.solicitante) {
          idAdversario = jogador;
        }
      });

      /*
       Recuperar as informações adicionais dos jogadores
      */
      const solicitante: Jogador = await this.clientAdminBackend
        .send('consultar-jogadores', desafio.solicitante)
        .toPromise();

      const adversario: Jogador = await this.clientAdminBackend
        .send('consultar-jogadores', idAdversario)
        .toPromise();

      let markup = '';
      markup = HTML_NOTIFICACAO_ADVERSARIO;
      markup = markup.replace(/#NOME_ADVERSARIO/g, adversario.nome);
      markup = markup.replace(/#NOME_SOLICITANTE/g, solicitante.nome);

      this.mailerService
        .sendMail({
          to: adversario.email,
          from: `"SMART RANKING" <isaiasiotti@gamil.com>`,
          subject: 'Notificação de Desafio',
          html: markup,
        })
        .then((success) => {
          this.logger.log(success);
        })
        .catch((err) => {
          this.logger.error(err.message);
        });
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
