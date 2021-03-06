import { DesafioStatus } from './desafio-status.enum';

export interface Desafio {
  _id: string;
  dataHoraDesafio: any;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta?: Date;
  solicitante: string;
  categoria: string;
  partida?: string;
  jogadores: string[];
}
