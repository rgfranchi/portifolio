/**
 * Interface de controle dos objetos da Entidade.
 */
export interface ITransmission {
  id: number;
  tipo: string;
  fabricante: string;
  modelo: string;
  chip?: string | null;
  operadora?: string | null;
  numeroLinha?: string | null;
  pin?: string | null;
  puk1?: string | null;
  puk2?: string | null;
  puk3?: string | null;
  imei?: string | null;
  pan?: string | null;
  observacoes?: string | null;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyTransmission: ITransmission = {
  id: 0,
  tipo: "",
  fabricante: "",
  modelo: "",
  chip: null,
  operadora: null,
  numeroLinha: null,
  pin: null,
  puk1: null,
  puk2: null,
  puk3: null,
  imei: null,
  pan: null,
  observacoes: "",
};
