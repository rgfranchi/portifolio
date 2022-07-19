/**
 * Formulário para operação de criar e atualizar Entidade.
 */
import React, { useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
// import * as Yup from "yup";
import { Form, Button, Col, Row, Image } from "react-bootstrap";

import { IPessoa } from "./PessoaData";
import { FormDatePicker } from "../../core/components/FormsComponent";
// import { dateTimeNowToString } from "../helper/ParsesHelper";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import Resizer from "react-image-file-resizer";

/**
 * Paramentos de validação da entidade.
 */
export const validate = null;

// export const validate = Yup.object({
//   nome: Yup.string()
//     .min(3, "Nome com no mínimo 3 caracteres")
//     .required("Preenchimento obrigatório"),
//   codOperador: Yup.string().required("Preenchimento obrigatório"),
//   funcao: Yup.string().required("Preenchimento obrigatório"),
//   sexo: Yup.string().required("Selecione Uma Opção"),
//   acessoDataInicial: Yup.date().max(
//     Yup.ref("acessoDataFinal"),
//     "Acesso Inicial deve ser ANTERIOR a Final"
//   ),
//   acessoDataFinal: Yup.date().min(
//     Yup.ref("acessoDataInicial"),
//     "Acesso Final deve ser POSTERIOR a Inicial"
//   ),
//   email: Yup.string()
//     .email("Endereço de e-mail inválido")
//     .required("Preenchimento obrigatório")
//     .nullable(),
// });

/**
 * Entidade formulário de Empresas
 */
const PessoaForm: React.FC<IFormCreateUpdate<IPessoa>> = ({
  initValues,
  submitForm,
}) => {
  console.log(initValues);
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const formikRef = useRef<FormikProps<IPessoa>>(null);
  console.log("FORMIK HELP", formikRef);

  const resizeImageBase64 = (file: any): any => {
    console.log(file);
    setSelectedFile(file.target.files[0]);
    const target = file.target.files[0];

    let compressFormat = target.type.replace("image/", "").toUpperCase();

    new Promise<string>((resolve) => {
      Resizer.imageFileResizer(
        target,
        640,
        480,
        compressFormat,
        80,
        0,
        (convert) => {
          resolve(convert as string);
        },
        "base64"
      );
    }).then((res: string) => {
      console.log("RES IMAGE", res);
      formikRef.current!.values.arquivo = res;
    });
  };

  // const fileChange = async (file_event: any) => {
  //   formikRef.current!.values.arquivo = await resizeImageToBase64(file_event);
  // };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            {selectedFile ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>Base64: {values.arquivo}</p>
              </div>
            ) : (
              ""
            )}

            {/* todo: Upload de arquivo para o google. TESTE em ../core/helper  */}
            <Form.Group as={Col} controlId="ctrlArquivo">
              <Form.Control
                type="file"
                name="loadFile"
                accept="image/*"
                onChange={resizeImageBase64}
                onBlur={handleBlur}
                // isInvalid={touched.arquivo && !!errors.arquivo}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="ctrlArquivo">
              {values.arquivo === "" ? (
                "Selecione uma Imagem"
              ) : (
                <Image
                  src={values.arquivo}
                  alt="base64img"
                  style={{
                    maxHeight: 100,
                    borderWidth: 3,
                    borderColor: "green",
                  }}
                />
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="7" controlId="ctrlNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={values.nome}
                placeholder="Nome do Pessoa"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nome && !!errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="ctrlIdade">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                type="number"
                name="idade"
                value={values.idade}
                placeholder="IDADE"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.idade && !!errors.idade}
              />
              <Form.Control.Feedback type="invalid">
                {errors.idade}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="ctrlEndereco">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                name="endereco"
                value={values.endereco}
                placeholder="Endereço"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.endereco && !!errors.endereco}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endereco}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="ctrlPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={values.password}
                placeholder="Senha"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
          </Row>
          <Button type="submit">Salvar</Button>
        </Form>
      )}
    </Formik>
  );
};

export default PessoaForm;
