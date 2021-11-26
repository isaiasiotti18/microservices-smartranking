export interface Categoria {
  readonly categoria: string;
  descricao: string;
  eventos: Evento[];
}

interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}
