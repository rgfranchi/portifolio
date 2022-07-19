import {
  emptyTransmission,
  ITransmission,
} from "../Transmission/TransmissionData";

/**
 * Ações a serem executadas com servidores para manutenção da entidade.
 * Matem premissas de dados ex: validação, valor vazio, etc...
 */
export interface IModule {
  id: number;
  codigo: string;
  modelo: string;
  fabricante: string;
  ativo: boolean;
  observacoes: string;
  companyId: number;
  listOperatorId: number[];
  placeId: number;
  transmission: ITransmission;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyModule: IModule = {
  id: 0,
  codigo: "",
  modelo: "",
  fabricante: "",
  ativo: true,
  observacoes: "",
  companyId: 0,
  listOperatorId: [],
  placeId: 0,
  transmission: emptyTransmission,
};
