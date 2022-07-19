import React from "react";

import { Formik } from "formik";
// import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

import { ILogin } from "./LoginData";

import "./LoginForm.css";
import { AlertList } from "../../core/components/AlertsComponent";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import { Link } from "react-router-dom";
import * as Yup from "yup";

/**
 * Paramentos de validação da entidade.
 */
export const validate = Yup.object({
  login: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("É Necessário informar um E-mail"),
  password: Yup.string().required("É Necessário informar uma senha"),
});

/**
 * Site de referência: https://www.tutorialrepublic.com/snippets/gallery.php?tag=login
 * Modelo: https://www.tutorialrepublic.com/codelab.php?topic=bootstrap-3&file=simple-login-form
 * @param data ILoginForm
 */
const LoginForm: React.FC<IFormCreateUpdate<ILogin>> = ({
  initValues,
  submitForm,
  loadValues,
}) => {
  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={submitForm}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => {
        return (
          <div className="login-form">
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center">LOGIN PAGE</h2>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="login"
                  value={values.login}
                  placeholder="E-mail cadastrado"
                  onChange={handleChange}
                  isInvalid={touched.login && !!errors.login}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.login}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Senha"
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <div className="d-grid gap-2">
                  <Button type="submit" disabled={!isValid}>
                    Login
                  </Button>
                </div>
              </Form.Group>
              <AlertList />
              <div className="clearfix">
                <Link to={"/recoverPassword"}>Recuperar Senha ?</Link>
              </div>
              <div className="clearfix">
                <Link to={"/user/create"}>Cadastrar Aluno</Link>
              </div>
              <div className="clearfix">
                <Link to={"/professor/pre_cadastro"}>Cadastrar Professor</Link>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
