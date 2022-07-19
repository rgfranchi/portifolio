/**
 * Formulário para operação de criar e atualizar Entidade.
 */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col } from "react-bootstrap";

import { IOperator } from "./OperatorData";
import { FormDatePicker } from "../components/FormsComponent";
import { dateTimeNowToString } from "../helper/ParsesHelper";
import { IFormCreateUpdate } from "../interfaces/FormInterface";

/**
 * Paramentos de validação da entidade.
 */
export const validate = Yup.object({
  nome: Yup.string()
    .min(3, "Nome com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  codOperador: Yup.string().required("Preenchimento obrigatório"),
  funcao: Yup.string().required("Preenchimento obrigatório"),
  sexo: Yup.string().required("Selecione Uma Opção"),
  acessoDataInicial: Yup.date().max(
    Yup.ref("acessoDataFinal"),
    "Acesso Inicial deve ser ANTERIOR a Final"
  ),
  acessoDataFinal: Yup.date().min(
    Yup.ref("acessoDataInicial"),
    "Acesso Final deve ser POSTERIOR a Inicial"
  ),
  email: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("Preenchimento obrigatório")
    .nullable(),
});

/**
 * Entidade formulário de Empresas
 */
const OperatorForm: React.FC<IFormCreateUpdate<IOperator>> = ({
  initValues,
  submitForm,
}) => {
  // caso não tenha valor definido para data é utiliza data atual
  // necessário para tornar o codigo testável.
  initValues.acessoDataInicial =
    initValues.acessoDataInicial || dateTimeNowToString(false);
  initValues.acessoDataFinal =
    initValues.acessoDataFinal || dateTimeNowToString(false);
  return (
    <Formik
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
          <Form.Row>
            <Form.Group as={Col} md="7" controlId="ctrlNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={values.nome}
                placeholder="Nome do Operador"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nome && !!errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="ctrlCodOperador">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                name="codOperador"
                value={values.codOperador}
                placeholder="Código do operador"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.codOperador && !!errors.codOperador}
              />
              <Form.Control.Feedback type="invalid">
                {errors.codOperador}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="ctrlSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                name="senha"
                value={values.senha}
                placeholder="Senha Operador"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.senha && !!errors.senha}
              />
              <Form.Control.Feedback type="invalid">
                {errors.senha}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="ctrlRFID">
              <Form.Label>Código RFID</Form.Label>
              <Form.Control
                type="text"
                name="rfid"
                value={values.rfid}
                placeholder="Código RFID"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="ctrlFuncao">
              <Form.Label>Função</Form.Label>
              <Form.Control
                type="text"
                name="funcao"
                value={values.funcao}
                placeholder="Função Operador"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.funcao && !!errors.funcao}
              />
              <Form.Control.Feedback type="invalid">
                {errors.funcao}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="ctrlAcessoDataInicial">
              <Form.Label>Acesso Inicial</Form.Label>
              <FormDatePicker
                name="acessoDataInicial"
                value={values.acessoDataInicial}
                formikSetFieldValue={setFieldValue}
                dateFormat="dd/MM/yyyy"
                format="yyyy-MM-dd"
                showTimeInput={false}
                isInvalid={
                  touched.acessoDataInicial && !!errors.acessoDataInicial
                }
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {errors.acessoDataInicial}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="ctrlAcessoDataFinal">
              <Form.Label>Acesso Final</Form.Label>
              <FormDatePicker
                name="acessoDataFinal"
                value={values.acessoDataFinal}
                formikSetFieldValue={setFieldValue}
                dateFormat="dd/MM/yyyy"
                format="yyyy-MM-dd"
                isInvalid={touched.acessoDataFinal && !!errors.acessoDataFinal}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                {errors.acessoDataFinal}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="ctrlEMAIL">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                name="email"
                value={values.email}
                placeholder="email@email.com"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="ctrlSexo">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                as="select"
                name="sexo"
                value={values.sexo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.sexo && !!errors.sexo}
              >
                <option value="">Selecione ... </option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.sexo}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="ctrlObservacao">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="observacao"
              value={values.observacao}
              placeholder="Informações sobre o operador .... "
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.observacao && !!errors.observacao}
            />
          </Form.Group>
          <Button type="submit" disabled={!isValid}>
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OperatorForm;
