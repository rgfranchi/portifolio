/**
 * Formulário para operação de criar e atualizar Entidade.
 */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col } from "react-bootstrap";

import { IUser, IGroupSelect } from "./UserData";
import { IFormCreateUpdate } from "../interfaces/FormInterface";

const newForm = {
  nome: Yup.string()
    .min(3, "Nome com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  email: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("Preenchimento obrigatório")
    .nullable(),
  groupId: Yup.number().moreThan(0, "Selecione Uma Opção"),
  password: Yup.string()
    .required("Preenchimento obrigatório")
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])/, "Pelo menos uma letra caixa 'ALTA' [A-Z]")
    .matches(/^(?=.*[a-z])/, "Pelo menos uma letra caixa 'baixa' [a-z]")
    .matches(/^(?=.*[0-9])/, "Pelo menos um numero [0-9]")
    .matches(
      /^(?=.*[@$!%*#?&|^~+=_-])/,
      "Pelo menos um carácter especial [@$!%*#?&|^~+=_-]"
    ),
  passwordConfirm: Yup.string()
    .required("Preenchimento obrigatório")
    // @ts-ignore
    .oneOf([Yup.ref("password"), null], "Valor de confirmação incorreto"),
};

/**
 * Paramentos de validação da entidade.
 */
export const validateNew = Yup.object(newForm);

export const validateUpdate = Yup.object({
  ...newForm,
  password: Yup.string()
    .notRequired()
    .min(8, "Senha deve conter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])/, "Pelo menos uma letra caixa 'ALTA' [A-Z]")
    .matches(/^(?=.*[a-z])/, "Pelo menos uma letra caixa 'baixa' [a-z]")
    .matches(/^(?=.*[0-9])/, "Pelo menos um numero [0-9]")
    .matches(/^(?=.*[!@#$%^&*])/, "Pelo menos um carácter especial [!@#$%^&*]"),
  passwordConfirm: Yup.string() // melhorara e confirmar .
    .notRequired()
    .oneOf([Yup.ref("password"), ""], "Valor de confirmação incorreto"),
});

/**
 * Entidade formulário de Empresas
 */
const UserForm: React.FC<IFormCreateUpdate<IUser>> = ({
  initValues,
  submitForm,
  loadValues,
}) => {
  // já possui password, pode ser me branco
  let validade: any = null;
  if (initValues.id > 0) {
    validade = validateUpdate;
  } else {
    validade = validateNew;
  }
  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validade}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Row>
            <Form.Group as={Col} md="9" controlId="ctrlNome">
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
            <Form.Group as={Col} md="3" controlId="ctrlGrupo">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                as="select"
                name="groupId"
                value={values.groupId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.groupId && !!errors.groupId}
              >
                <option value={0}>Selecione ... </option>
                {loadValues.groups.map((val: IGroupSelect) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.nome}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.groupId}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
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
            <Form.Group as={Col} md="4" controlId="ctrlPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={values.password || ""}
                placeholder="Senha do Usuário"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="ctrlTipo">
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                name="passwordConfirm"
                type="password"
                value={values.passwordConfirm || ""}
                placeholder="Confirmar Senha do Usuário"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit" disabled={!isValid}>
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
