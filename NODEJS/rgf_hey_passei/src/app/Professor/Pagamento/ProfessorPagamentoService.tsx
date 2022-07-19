import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingComponent from "../../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../../core/interfaces/SessionInterface";
import ProfessorPagamentoForm from "./ProfessorPagamentoForm";
import {
  emptyProfessorPagamento,
  findById,
  IProfessorPagamento,
  IProfessorPagamentoSubmit,
  updateProfessorPagamento,
} from "./ProfessorPagamentoData";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Variáveis local
 */
let dispatch: any = null;
let navigate: NavigateFunction;

export const ProfessorPagamento: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );

  const [initValues, setInitValues] = useState<IProfessorPagamento>(
    emptyProfessorPagamento
  );

  useEffect(() => {
    const loadValue = async () => {
      await waitDoProcess<IProfessorPagamento>({
        dispatch,
        loadingText: `Carregando Disciplinas ...`,
        doProcess: findById,
        doProcessParam: currentSession.activeUser.id,
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
    return <PageLoadingComponent pageName="Professor Pagamento" />;
  } else {
    return (
      <ProfessorPagamentoForm
        initValues={initValues}
        submitForm={submit}
        loadValues={{
          backButton: () => navigate("/professor/academica"),
        }}
      />
    );
  }
};

const submit = async (
  values: IProfessorPagamento,
  formikHelper: FormikHelpers<IProfessorPagamento>
) => {
  // console.log(values);
  // await submitForm<IProfessorPagamento, IProfessorPagamentoSubmit>({
  //   values: values,
  //   formikHelper: formikHelper,
  //   submitData: updateProfessorPagamento,
  //   dispatch: dispatch,
  //   messageLoading: "Salvando Pagamento",
  //   messageSuccess: "Salvo com sucesso",
  //   // redirect: "/xpto",
  //   navigate: navigate,
  // });
  navigate("/professor/apresentacao");
  // console.log("submitDisciplina", values);
};
