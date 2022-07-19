import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingComponent from "../../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../../core/interfaces/SessionInterface";
import { allDisciplinas } from "../../Disciplina/DisciplinaData";
import ProfessorDisciplinaForm from "./ProfessorDisciplinaForm";
import {
  emptyProfessorDisciplina,
  findById,
  IProfessorDisciplina,
  IProfessorDisciplinaSubmit,
  updateProfessorDisciplina,
} from "./ProfessorDisciplinaData";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Variáveis local
 */
let dispatch: any = null;
let navigate: NavigateFunction;

export const ProfessorDisciplina: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );

  const [initValues, setInitValues] = useState<IProfessorDisciplina>(
    emptyProfessorDisciplina
  );

  console.log(currentSession);

  useEffect(() => {
    const loadValue = async () => {
      await waitDoProcess<IProfessorDisciplina>({
        dispatch,
        loadingText: `Carregando Disciplinas ...`,
        doProcess: allDisciplinas,
        // doProcessParam: currentSession.activeUser.id,
        setInitValues,
        beforeProcess: async (before: any) => {
          before.before = await findById(currentSession.activeUser.id);
          // console.log(before);
        },
        afterProcess: async (after: any) => {
          after.response = {
            id: currentSession.activeUser.id,
            professor_name: currentSession.activeUser.name,
            disciplina: after.before.disciplina,
            disciplina_outras: after.before.disciplina_outras,
            disciplinas: after.response,
          };
          delete after.before;
        },
      });
    };
    loadValue();
  }, []);

  // console.log(initValues);
  if (initValues.id === "") {
    return <PageLoadingComponent pageName="Professor" />;
  } else {
    return (
      <ProfessorDisciplinaForm
        initValues={initValues}
        submitForm={submit}
        loadValues={{ backButton: () => navigate("/") }}
      />
    );
  }
};

const submit = async (
  values: IProfessorDisciplina,
  formikHelper: FormikHelpers<IProfessorDisciplina>
) => {
  // console.log(values);
  await submitForm<IProfessorDisciplina, IProfessorDisciplinaSubmit>({
    values: values,
    formikHelper: formikHelper,
    submitData: updateProfessorDisciplina,
    dispatch: dispatch,
    messageLoading: "Salvando Disciplinas",
    messageSuccess: "Salvo com sucesso",
    redirect: "documento",
    navigate: navigate,
  });
  // console.log("submitDisciplina", values);
};
