import { FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoadingComponent from "../../../core/components/PageLoadingComponent";
import { submitForm, waitDoProcess } from "../../../core/helper/ServiceHelper";
import { ISessionSlice } from "../../../core/interfaces/SessionInterface";
import {
  emptyProfessorApresentacao,
  findById,
  IProfessorApresentacao,
  IProfessorApresentacaoSubmit,
  updateProfessorApresentacao,
} from "./ProfessorApresentacaoData";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ProfessorApresentacaoForm from "./ProfessorApresentacaoForm";
import { serverGoogleDrive } from "../../config/api";

/**
 * Variáveis local
 */
let dispatch: any = null;
let navigate: NavigateFunction;
// let currentSession: ISessionSlice;

export const ProfessorApresentacao: React.FC = () => {
  dispatch = useDispatch();
  navigate = useNavigate();
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );

  const [initValues, setInitValues] = useState<IProfessorApresentacao>(
    emptyProfessorApresentacao
  );

  useEffect(() => {
    const loadData = async () => {
      await waitDoProcess<IProfessorApresentacao>({
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
    loadData();
  }, []);

  console.log(initValues);
  if (initValues.id === "") {
    return <PageLoadingComponent pageName="Professor" />;
  } else {
    return (
      <ProfessorApresentacaoForm
        initValues={initValues}
        submitForm={submit}
        loadValues={{ backButton: () => navigate("/professor/pagamento") }}
      />
    );
  }
};

const submit = async (
  values: IProfessorApresentacao,
  formikHelper: FormikHelpers<IProfessorApresentacao>
) => {
  console.log(values);

  console.log(values);

  const file64encode = values.arquivoApresentacao.split(",");
  const base64 = file64encode[1];
  const mimeType = file64encode[0].slice(
    file64encode[0].indexOf(":") + 1,
    file64encode[0].lastIndexOf(";")
  );
  const fileExtension = mimeType.substring(mimeType.indexOf("/") + 1);

  const postValue = {
    parents: ["1nXkkY19ZSTktb0E-yRw-9do7te7-9axX"],
    mimeType: mimeType,
    name: `TESTE.${fileExtension}`,
    base64: base64,
  };

  console.log(postValue);

  await serverGoogleDrive
    .post<any>("/create", postValue)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });

  // await submitForm<IProfessorApresentacao, IProfessorApresentacaoSubmit>({
  //   values: values,
  //   formikHelper: formikHelper,
  //   submitData: updateProfessorApresentacao,
  //   dispatch: dispatch,
  //   messageLoading: "Salvando Disciplinas",
  //   messageSuccess: "Salvo com sucesso",
  //   // redirect: "/xpto",
  //   navigate: navigate,
  // });
  navigate("/professor/exercicio");
  // console.log("submitDisciplina", values);
};
