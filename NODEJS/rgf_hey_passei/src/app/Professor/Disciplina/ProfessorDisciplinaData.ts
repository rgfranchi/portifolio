import { IDataSave } from "../../../core/interfaces/DataInterface";
import { emptyDisciplina, IDisciplina } from "../../Disciplina/DisciplinaData";
import { findAll, searchById, update } from "../../helper/AirtableCRUDHelper";
import { IProfessor } from "../ProfessorData";

export interface IProfessorDisciplinaSubmit {
  disciplina: IDisciplina[];
  disciplina_outras?: string;
}

export interface IProfessorDisciplina extends IProfessorDisciplinaSubmit {
  id: string;
  disciplinas?: IDisciplina[];
}

export const emptyProfessorDisciplina: IProfessorDisciplina = {
  id: "",
  disciplinas: [emptyDisciplina],
  disciplina: [emptyDisciplina],
  disciplina_outras: "",
};

const pathURL = "/users";

export const displayName = { many: "Professores", one: "Professor" };

// export const updateProfessor = async (
//   values: IProfessor
// ): Promise<IDataSave<IProfessor>> => {
//   delete values.passwordConfirm;
//   values.whatsApp = whatsAppFormat(values.whatsApp);
//   console.log(values);
//   return await update<IProfessor>({
//     pathURL: pathURL,
//     pathURI: "/" + values.id,
//     displayName: displayName,
//     valueId: values.id,
//     value: values,
//     textShow: joinNome(values.primeiroNome, values.sobrenome),
//   });
// };

// export const findById = async (id: string): Promise<IDataValue<IProfessor>> => {
//   return await searchById<IProfessor>({
//     displayName: displayName,
//     pathURL: pathURL,
//     id: "/" + id,
//   });
// };

export const findById = async (id: string): Promise<IProfessorDisciplina> => {
  const data = await searchById<IProfessorDisciplina>({
    displayName: displayName,
    pathURL: pathURL,
    id: "/" + id,
  });
  return data.response as IProfessorDisciplina;
};

/**
 * Encaminha valores apenas para atualização do professor
 * @param values
 * @returns
 */
export const updateProfessorDisciplina = async (
  values: IProfessorDisciplina
): Promise<IDataSave<IProfessorDisciplinaSubmit>> => {
  return await update<IProfessorDisciplinaSubmit>({
    pathURL: pathURL,
    pathURI: "/" + values.id,
    displayName: displayName,
    valueId: values.id,
    value: {
      disciplina: values.disciplina,
      disciplina_outras: values.disciplina_outras!,
    },
    textShow: "Disciplinas atualizadas com sucesso",
  });
};

//   const data = await findById(currentSession.activeUser.id);
//   const prof: IProfessor = data.response as IProfessor;
//   before.user_disciplinas_id = Object.keys(prof.disciplina).map(
//     function (key) {
//       return prof.disciplina[key].id;
//     }
//   );
