import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

import { ILogin } from "./LoginData";

import "./LoginForm.css";
import { AlertList } from "../components/AlertsComponent";
import { IFormCreateUpdate } from "../interfaces/FormInterface";

/**
 * Paramentos de validação da entidade.
 */
export const validate = Yup.object({
  email: Yup.string()
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
              <h2 className="text-center">BIILOG</h2>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="E-mail cadastrado"
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
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
                <Button type="submit" block={true} disabled={!isValid}>
                  Login
                </Button>
              </Form.Group>
              <AlertList />
              <div className="clearfix">
                <a href="/recoverPassword">Recuperar Senha ?</a>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
