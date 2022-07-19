import {
  IDataList,
  IDataSave,
  IDataValue,
} from "../../core/interfaces/DataInterface";
import { emptyDisciplina, IDisciplina } from "../Disciplina/DisciplinaData";
import { emptyGroup } from "../Group/GroupData";
import {
  create,
  findAll,
  searchById,
  update,
} from "../helper/AirtableCRUDHelper";
import { IUsers, joinNome, whatsAppFormat } from "../User/UserData";

export interface IProfessor extends IUsers {
  id: "";
  codPostal: string;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  disciplina?: IDisciplina[];
  fotoCadastro?: string;
}

/**
 * Valores padrão vazio para preenchimento da entidade
 */
export const emptyProfessor: IProfessor = {
  id: "",
  primeiroNome: "",
  sobrenome: "",
  login: "",
  whatsApp: "55",
  password: "",
  passwordConfirm: "",
  active: true,
  group: [{ ...emptyGroup, ...{ name: "professor" } }],

  codPostal: "",
  pais: "Brasil",
  estado: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  disciplina: [emptyDisciplina],
  fotoCadastro: "",
};

const pathURL = "/users";

export const displayName = { many: "Professores", one: "Professor" };

export const createProfessor = async (
  values: IProfessor
): Promise<IDataSave<IProfessor>> => {
  delete values.passwordConfirm;
  values.whatsApp = whatsAppFormat(values.whatsApp);
  console.log(values);

  return await create<IProfessor>({
    pathURL: pathURL,
    displayName: displayName,
    textShow: joinNome(values.primeiroNome, values.sobrenome),
    value: values,
  });
};

export const updateProfessor = async (
  values: IProfessor
): Promise<IDataSave<IProfessor>> => {
  delete values.passwordConfirm;
  values.whatsApp = whatsAppFormat(values.whatsApp);
  console.log(values);
  return await update<IProfessor>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: values,
    textShow: joinNome(values.primeiroNome, values.sobrenome),
  });
};

export const findById = async (id: string): Promise<IDataValue<IProfessor>> => {
  return await searchById<IProfessor>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
};

// export const findById_disciplina = async (id: string): Promise<string[]> => {
//   const data = await searchById<IProfessor>({
//     displayName: displayName,
//     pathURL: pathURL,
//     id: "/" + id,
//   });
//   const resp: IProfessor = data.response as IProfessor;
//   const disciplinas_id = Object.keys(resp.disciplina).map((key: any) => {
//     return resp.disciplina[key].id;
//   });
//   return disciplinas_id;
// };
//   const data = await findById(currentSession.activeUser.id);
//   const prof: IProfessor = data.response as IProfessor;
//   before.user_disciplinas_id = Object.keys(prof.disciplina).map(
//     function (key) {
//       return prof.disciplina[key].id;
//     }
//   );
