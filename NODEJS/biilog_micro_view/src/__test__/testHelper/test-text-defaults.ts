import { IAlertSlice, ICompanySlice } from "../../interfaces/ReduxInterface";

export let defaultMessageTextData = {
  vaziaResponse: /vazia/i,
  falhaAcessarServidor: /Falha ao acessar servidor/i,
  idNaoDefinido: /ID não definido/i,
  criadoValor: "VALOR CRIADO XPTO",
  criadoSucesso: /Criado com sucesso/i,
  atualizadoValor: "VALOR ATUALIZADO XPTO",
  atualizadoSucesso: /Atualizado com sucesso/i,
  excluidoSucesso: "DELETED",
  erro208: "RETORNA_ERRO_208", // resposta Valida porem não esperada.
  erro208Mensagem: /INVALIDO Status/i,
  erro400: "RETORNA_ERRO_400", // resposta Valida porem não esperada.
  erro400Mensagem: /ERROR STATUS/i,
};

export let defaultFormTextValidate = {
  preenchimento: /Preenchimento obrigatório/i,
  minimo3caracteres: /com no mínimo 3 caracteres/i,
  emailInvalido: /e-mail inválido/i,
  cepFormato: /formato de 99999-999/i,
  cnpjInvalido: /CNPJ inválido/i,
  selecioneOpcao: /Selecione Uma Opção/i,
};

export let defaultPageText = {
  list: {
    access: { create: { path: "/new" }, update: {}, delete: {} },
    historyKey1: "KEY_LIST1",
    url1: "",
    historyKey2: "",
    find: ["TitleComponent", "ButtonCreate", "List"],
  },
  create: {
    access: { create: { path: "/new" }, update: {}, delete: {} },
    historyKey1: "KEY_NEW1",
    url1: "//new",
    historyKey2: "KEY_NEW2",
    find: ["TitleComponent", "CreateForm"],
  },
  update: {
    access: { create: { path: "/new" }, update: {}, delete: {} },
    historyKey1: "KEY_UPDATE1",
    url1: "//update/2",
    historyKey2: "KEY_UPDATE2",
    find: ["TitleComponent", "UpdateForm"],
  },
};

export let alertSliceDefault: IAlertSlice = {
  hidden: true,
  message: null,
  variant: "primary",
};

export let companySliceDefault: ICompanySlice = {
  id: 3,
  nome: "Company Slice Mock",
};

// @ts-ignore
export let modalSliceDefault: IConfirmModal = {
  loading: {
    show: false,
    message: null,
  },
  confirm: {
    show: false,
    executed: 0, // incrementa a cada nova tentativa.
    disabledButtons: false,
    textTitle: null,
    textBody: null,
    textAction: "Executar",
    errorExecute: null,
    variantAction: "primary",
  },
  fail: {
    show: false,
    redirect: null,
    textFail: "Falha ao Executar",
    textButton: "Falhou ... ",
  },
  success: {
    show: false,
    redirect: null,
    textSuccess: "Sucesso!!!",
    textButton: "OK",
  },
};
