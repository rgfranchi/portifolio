import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingComponent from "../../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../../core/interfaces/SessionInterface";
import {
  emptyProfessorDocumento,
  findById,
  IProfessorDocumento,
  IProfessorDocumentoSubmit,
  updateProfessorDocumento,
} from "./ProfessorDocumentoData";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ProfessorDocumentoForm from "./ProfessorDocumentoForm";

/**
 * Variáveis local
 */
let dispatch: any = null;
let navigate: NavigateFunction;

export const ProfessorDocumento: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );

  const [initValues, setInitValues] = useState<IProfessorDocumento>(
    emptyProfessorDocumento
  );

  useEffect(() => {
    const loadValue = async () => {
      await waitDoProcess<IProfessorDocumento>({
        dispatch,
        loadingText: `Carregando Disciplinas ...`,
        doProcess: findById,
        doProcessParam: currentSession.activeUser.id,
        setInitValues,
        // beforeProcess: async (before: any) => {
        //   // before.before = await findById(currentSession.activeUser.id);
        //   // console.log(before);
        // },
        // afterProcess: async (after: any) => {
        //   // after.response = {
        //   //   id: currentSession.activeUser.id,
        //   //   professor_name: currentSession.activeUser.name,
        //   //   disciplina: after.before.disciplina,
        //   //   disciplina_outras: after.before.disciplina_outras,
        //   //   disciplinas: after.response,
        //   // };
        //   // delete after.before;
        // },
      });
    };
    loadValue();
  }, []);

  // console.log(initValues);
  if (initValues.id === "") {
    return <PageLoadingComponent pageName="Professor" />;
  } else {
    return (
      <ProfessorDocumentoForm
        initValues={initValues}
        submitForm={submit}
        loadValues={{ backButton: () => navigate("/professor") }}
      />
    );
  }
};

const submit = async (
  values: IProfessorDocumento,
  formikHelper: FormikHelpers<IProfessorDocumento>
) => {
  // console.log(values);
  // await submitForm<IProfessorDocumento, IProfessorDocumentoSubmit>({
  //   values: values,
  //   formikHelper: formikHelper,
  //   submitData: updateProfessorDocumento,
  //   dispatch: dispatch,
  //   messageLoading: "Salvando Disciplinas",
  //   messageSuccess: "Salvo com sucesso",
  //   // redirect: "/xpto",
  //   navigate: navigate,
  // });
  navigate("/professor/academica");
  // console.log("submitDisciplina", values);
};
