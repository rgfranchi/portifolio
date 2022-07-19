import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingComponent from "../../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../../core/interfaces/SessionInterface";
import { allDisciplinas } from "../../Disciplina/DisciplinaData";
import ProfessorDisciplinaForm from "./ProfessorAcademicaForm";
import {
  emptyProfessorAcademica,
  IProfessorAcademica,
  IProfessorAcademicaSubmit,
  updateProfessorAcademica,
} from "./ProfessorAcademicaData";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Variáveis local
 */
let dispatch: any = null;
let navigate: NavigateFunction;

export const ProfessorAcademica: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );

  const [initValues, setInitValues] = useState<IProfessorAcademica>(
    emptyProfessorAcademica
  );

  useEffect(() => {
    const loadValue = async () => {
      await waitDoProcess<IProfessorAcademica>({
        dispatch,
        loadingText: `Carregando Disciplinas ...`,
        doProcess: allDisciplinas,
        // doProcessParam: currentSession.activeUser.id,
        setInitValues,
        beforeProcess: async (before: any) => {
          // before.before = await findById(currentSession.activeUser.id);
          // console.log(before);
        },
        afterProcess: async (after: any) => {
          // after.response = {
          //   id: currentSession.activeUser.id,
          //   professor_name: currentSession.activeUser.name,
          //   disciplina: after.before.disciplina,
          //   disciplina_outras: after.before.disciplina_outras,
          //   disciplinas: after.response,
          // };
          // delete after.before;
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
      <ProfessorDisciplinaForm initValues={initValues} submitForm={submit} />
    );
  }
};

const submit = async (
  values: IProfessorAcademica,
  formikHelper: FormikHelpers<IProfessorAcademica>
) => {
  // console.log(values);
  await submitForm<IProfessorAcademica, IProfessorAcademicaSubmit>({
    values: values,
    formikHelper: formikHelper,
    submitData: updateProfessorAcademica,
    dispatch: dispatch,
    messageLoading: "Salvando Disciplinas",
    messageSuccess: "Salvo com sucesso",
    // redirect: "/xpto",
    navigate: navigate,
  });
  // console.log("submitDisciplina", values);
};
