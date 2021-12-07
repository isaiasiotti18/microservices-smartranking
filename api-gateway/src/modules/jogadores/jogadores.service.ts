import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AwsS3Service } from "../aws/aws-s3.service";
import { Categoria } from "../categorias/interfaces/categoria.interface";
import { ClientProxySmartRanking } from "../proxyrmq/client-proxy";
import { AtualizarJogadorDto } from "./dtos/atualizar-jogador.dto";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";

@Injectable()
export class JogadoresService {
  private logger = new Logger(JogadoresService.name);

  constructor(
    private clientProxySmartRanking: ClientProxySmartRanking,
    private awsService: AwsS3Service,
  ) {}

  private clientAdminBackend = this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  async criarJogador(criarJogadorDto: CriarJogadorDto) {
    this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

    const categoria: Categoria = await this.clientAdminBackend
      .send('consultar-categorias', criarJogadorDto.categoria)
      .toPromise();

    if (categoria) {
      await this.clientAdminBackend.emit('criar-jogador', criarJogadorDto);
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`);
    }
  }

  async uploadArquivo(file, _id: string): Promise<any> {
    //Verificar se o jogador está cadastrado
    const jogador: Jogador = await this.clientAdminBackend
      .send('consultar-jogadores', _id)
      .toPromise();

    if (!jogador) {
      throw new BadRequestException(`Jogador não encontrado!`);
    }

    //Enviar o arquivo para o S3 e recuperar a URL de acesso
    const urlFotoJogador: { url: '' } = await this.awsService.uploadArquivo(
      file,
      _id,
    );

    //Atualizar o atributo URL da entidade jogador
    const atualizarJogadorDto: AtualizarJogadorDto = {};
    atualizarJogadorDto.urlFotoJogador = urlFotoJogador.url;

    await this.clientAdminBackend.emit('atualizar-jogador', {
      id: _id,
      jogador: atualizarJogadorDto,
    });

    //Retornar o jogador atualizado para o cliente
    return await this.clientAdminBackend
      .send('consultar-jogadores', _id)
      .toPromise();
  }

  async consultarJogadores(_id: string): Promise<any> {
    return await this.clientAdminBackend
      .send('consultar-jogadores', _id ? _id : '')
      .toPromise();
  }

  async atualizarJogador(
    atualizarJogadorDto: AtualizarJogadorDto,
    _id: string,
  ) {
    const categoria: Categoria = await this.clientAdminBackend
      .send('consultar-categorias', atualizarJogadorDto.categoria)
      .toPromise();

    if (categoria) {
      await this.clientAdminBackend.emit('atualizar-jogador', {
        id: _id,
        jogador: atualizarJogadorDto,
      });
    } else {
      throw new BadRequestException(`Categoria não cadastrada!`);
    }
  }

  deletarJogador(_id: string) {
    this.clientAdminBackend.emit('deletar-jogador', { _id });
  }

}