import { group } from "console";
import {
  convertFromAirtable,
  convertSubObject,
  convertToAirtable,
} from "../AirtableConvertHelper";

describe("Convert Airtable Data em Database Data", () => {
  test("convertFromAirtable findAll", async () => {
    const resp = convertFromAirtable(fromFindAll);
    // console.log(resp);
    expect(resp.length).toEqual(4); // quantidade de valores.
    expect(resp[0].group[0].link).toEqual("alunos"); // ultimo nó da árvore.
  });
  test("convertFromAirtable singleData", async () => {
    const resp = convertFromAirtable(fromSingleData);
    // console.log(resp);
    expect(resp[0].nome).toEqual("Chaves");
  });
  test("convertFromAirtable findById", async () => {
    const resp = convertFromAirtable(fromFindById);
    // console.log(resp);
    expect(resp.nome).toEqual("Chaves");
  });
  test("convertFromAirtable USER DISCIPLINA ARRAY", async () => {
    const resp = convertFromAirtable<any>(userData);
    // console.log(resp);
    // @ts-ignore
    expect(resp.login).toEqual("professor@teste.com");
    expect(resp.group[0].id).toEqual("recIQz1EJrWWR7Fma");
    expect(resp.disciplina[0].id).toEqual("recF6TfJkKF3P15fl");
    expect(resp.disciplina[1].id).toEqual("recGTVByd8bw5A9mG");
  });

  // test("convertToAirtable SINGLE", async () => {
  //   const resp = convertToAirtable<any>(toData);
  //   // console.log(resp);
  //   // @ts-ignore
  //   expect(resp.id).toEqual(undefined);
  //   expect(resp.fields.nome).toEqual("Chaves");
  // });
  test("convertToAirtable SINGLE", async () => {
    const resp = convertToAirtable<any>(toData);
    // console.log(resp);
    // @ts-ignore
    expect(resp.id).toEqual(undefined);
    expect(resp.fields["group.id"]).toEqual([
      "recIe3VV9NTrD9uUL",
      "recIe3VV9NTrD9Dfg",
    ]);
    expect(resp.fields.nome).toEqual("Chaves");
  });
});

describe("Convert chave para sub objeto", () => {
  test("convertSubObject le chaves com '.' para objetos", async () => {
    let currentObj = {
      fieldX: "valX",
      fieldY: "valY",
      "subobjK.field1": "valK1",
      "subobjK.field2": "valK2",
    };

    const resp = convertSubObject(currentObj, "subobjK.field1");
    convertSubObject(resp, "subobjK.field2");
    // console.log(resp);
    // @ts-ignore
    expect(resp.subobjK[0].field1).toEqual("valK1");
    expect(resp.subobjK[0].field2).toEqual("valK2");
  });
});

// describe("Convert array para array de Objeto", () => {
//   test("dataArrayToObjectArray convert variável única para objeto", () => {
//     let data = {
//       fieldArrayA: ["valA_0", "valA_1", "valA_2"],
//       fieldArrayB: ["valB_0", "valB_1", "valB_2"],
//     };
//     let resp = dataArrayToObjectArray(data.fieldArrayA, "fieldArrayA", []);
//     expect([
//       { fieldArrayA: "valA_0" },
//       { fieldArrayA: "valA_1" },
//       { fieldArrayA: "valA_2" },
//     ]).toEqual(resp);

//     resp = dataArrayToObjectArray(data.fieldArrayB, "fieldArrayB", resp);

//     expect([
//       { fieldArrayA: "valA_0", fieldArrayB: "valB_0" },
//       { fieldArrayA: "valA_1", fieldArrayB: "valB_1" },
//       { fieldArrayA: "valA_2", fieldArrayB: "valB_2" },
//     ]).toEqual(resp);
//   });
// });

var fromFindAll = [
  {
    id: "rec3XsW4QJUFFNuUw",
    fields: {
      nome: "Chaves",
      idade: 8,
      endereco: "Casa 8.",
      password: "sdbdbdbdb",
      Created: "2022-02-10T01:09:24.000Z",
      Calculation: "8 anos",
      "group.link": ["alunos", "provas"],
      "group.label": ["Alunos", "Provas"],
      "group.name": ["aluno", "prova"],
    },
    createdTime: "2022-02-10T01:09:24.000Z",
  },
  {
    id: "recEECpNionUFEBlW",
    fields: {
      nome: "Kiko",
      idade: 9,
      endereco: "Casa 14",
      password: "dfdfsfaba",
      Created: "2022-02-10T01:09:24.000Z",
      Calculation: "9 anos",
      "subA.field1": "ValA1",
      "subA.field2": "ValA2",
      "subA.field3": "ValA3",
      "subB.field1": "ValB1",
      "subB.field2": "ValB2",
      "subB.field3": "ValB3",
    },
    createdTime: "2022-02-10T01:09:24.000Z",
  },
  {
    id: "rec7qQ5lgoppXYW8d",
    fields: {
      nome: "Chiquinha",
      idade: 11,
      endereco: "Casa 72",
      password: "asdfasdf",
      Created: "2022-02-10T01:09:24.000Z",
      Calculation: "11 anos",
    },
    createdTime: "2022-02-10T01:09:24.000Z",
  },
  {
    id: "recTBBze2FWV5u5Gl",
    fields: {
      nome: "Rafael Guerra",
      idade: 40,
      endereco: "Francisco ....",
      password: "1234",
      Created: "2022-02-22T12:11:01.000Z",
      Calculation: "40 anos",
    },
    createdTime: "2022-02-22T12:11:01.000Z",
  },
];

var fromSingleData = [
  {
    id: "rec3XsW4QJUFFNuUw",
    fields: {
      nome: "Chaves",
      idade: 8,
      endereco: "Casa 8.",
      password: "sdbdbdbdb",
      Created: "2022-02-10T01:09:24.000Z",
      Calculation: "8 anos",
      "fakeSubObjA.filed1": "1-ObjA_1",
      "fakeSubObjA.filed2": "1-ObjA_2",
      "fakeSubObjB.filed1": "1-ObjA_3",
    },
    createdTime: "2022-02-10T01:09:24.000Z",
  },
];

var fromFindById = {
  id: "rec3XsW4QJUFFNuUw",
  fields: {
    nome: "Chaves",
    idade: 8,
    endereco: "Casa 8.",
    password: "sdbdbdbdb",
    Created: "2022-02-10T01:09:24.000Z",
    Calculation: "8 anos",
    "fakeSubObjA.filed1": "1-ObjA_1",
    "fakeSubObjA.filed2": "1-ObjA_2",
    "fakeSubObjB.filed1": "1-ObjA_3",
  },
  createdTime: "2022-02-10T01:09:24.000Z",
};

var toData = {
  id: "rec3XsW4QJUFFNuUw",
  createdTime: "2022-02-10T01:09:24.000Z",
  nome: "Chaves",
  idade: 8,
  endereco: "Casa 8.",
  password: "sdbdbdbdb",
  Created: "2022-02-10T01:09:24.000Z",
  Calculation: "8 anos",
  group: [
    { id: "recIe3VV9NTrD9uUL", name: "nome teste" },
    { id: "recIe3VV9NTrD9Dfg", name: "nome teste" },
  ],
  fakeSubObjA: [{ filed1: "1-ObjA_1", filed2: "1-ObjA_2" }],
  fakeSubObjB: [{ filed1: "1-ObjA_3" }],
};

var findLogin = {
  records: [
    {
      id: "recVU6U1FJbsoss2T",
      fields: {
        name: "Carlos Professor",
        login: "professor@teste.com",
        password: "MTIz",
        active: true,
        "group.id": ["recIe3VV9NTrD9uUL"],
        "group.name": ["professor"],
        "group.access": [
          '[{\n  "path": "/operator",\n  "label": "Operadores",\n  "page": {\n    "create": {\n      "path": "/new",\n      "label": "Inserir Operador"\n    },\n    "update": {\n      "path": "/update"\n    },\n    "delete": {\n      "path": "/delete"\n    }\n  }\n}, \n{\n  "label": "Cadastro",\n  "sub_item": [\n    {\n      "path": "/user",\n      "label": "User",\n      "page": {\n        "create": {\n          "path": "/new",\n          "label": "Nova Máquina"\n        },\n        "update": {\n          "path": "/update"\n        },\n        "delete": {\n          "path": "/delete"\n        }\n      }\n    },\n    {\n      "path": "/machine",\n      "label": "Máquina",\n      "page": {\n        "create": {\n          "path": "/new",\n          "label": "Nova Máquina"\n        },\n        "update": {\n          "path": "/update"\n        },\n        "delete": {\n          "path": "/delete"\n        }\n      }\n    }\n  ]\n}]',
        ],
      },
      createdTime: "2022-03-02T17:03:43.000Z",
    },
  ],
};

const userData = {
  id: "recVU6U1FJbsoss2T",
  createdTime: "2022-03-02T17:03:43.000Z",
  fields: {
    login: "professor@teste.com",
    password: "cHJvZmVzc29yMTIzNDU2dGVzdGUuY29t",
    active: true,
    "group.id": ["recIQz1EJrWWR7Fma"],
    sobrenome: "ProfessorXY (boaj7y0y088)",
    whatsApp: "+5512345645465",
    codPostal: "05520-200",
    pais: "Brasil",
    estado: "SP",
    cidade: "São Paulo",
    bairro: "Vila Sônia",
    logradouro: "Avenida Professor Francisco Morato",
    numero: "4886 ",
    complemento: "188",
    "disciplina.id": ["recF6TfJkKF3P15fl", "recGTVByd8bw5A9mG"],
    primeiroNome: "Carlos Francisco",
    disciplina_outras: "teste outras",
    "group.name": ["professor_pre_cadastro"],
    "group.access": [
      '[\n{\n  "path": "professor",\n  "label": "Pré-Cadastro",\n  "page": {\n    "update": {\n      "path": "professorPreCadastro"\n    }\n  } \n}\n]',
    ],
  },
};
