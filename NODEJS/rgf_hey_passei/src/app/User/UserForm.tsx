import { Formik, FormikProps } from "formik";
import { Col, Row, Form, Button } from "react-bootstrap";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import { IUsers } from "./UserData";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { ModalSuccess } from "../../core/components/ModalsComponent";

export const whatsAppMask = [
  "+",
  "[",
  /[0-9]/,
  /[0-9]/,
  "]",
  "(",
  /[0-9]/,
  /[0-9]/,
  ")",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
];

export const newForm = {
  primeiroNome: Yup.string()
    .min(3, "Nome com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  sobrenome: Yup.string()
    .min(3, "Nome com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  login: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("Preenchimento obrigatório")
    .nullable(),
  whatsApp: Yup.string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    // .matches(/^\[\d{2}\]\(\d{2}\)\d{5}-\d{4}$/, "Deve conter 13 números")
    .matches(/^\d{13}$/, "Deve conter 13 números")
    .required("Preenchimento obrigatório"),
  password: Yup.string()
    .required("Preenchimento obrigatório")
    .min(6, "Senha deve conter no mínimo 6 caracteres"),
  passwordConfirm: Yup.string()
    .required("Preenchimento obrigatório")
    .oneOf([Yup.ref("password"), null], "Valor de confirmação incorreto"),
};

export const validateNew = Yup.object(newForm);

export const validateUpdate = Yup.object({
  ...newForm,
  password: Yup.string()
    .notRequired()
    .min(6, "Senha deve conter no mínimo 6 caracteres"),
  passwordConfirm: Yup.string() // melhorara e confirmar .
    .notRequired()
    .oneOf([Yup.ref("password"), ""], "Valor de confirmação incorreto"),
});

// export const validateNew = {
//   primeiroNome: Yup.string()
//     .min(3, "Nome com no mínimo 3 caracteres")
//     .required("Preenchimento obrigatório"),
//   sobrenome: Yup.string()
//     .min(3, "Nome com no mínimo 3 caracteres")
//     .required("Preenchimento obrigatório"),
//   login: Yup.string()
//     .email("Endereço de e-mail inválido")
//     .required("Preenchimento obrigatório")
//     .nullable(),
//   whatsApp: Yup.string()
//     .matches(/^\[\d{2}\]\(\d{2}\)\d{5}-\d{4}$/, "Deve conter 13 números")
//     .required("Preenchimento obrigatório"),
//   password: Yup.string()
//     .required("Preenchimento obrigatório")
//     .min(6, "Senha deve conter no mínimo 6 caracteres"),
//   passwordConfirm: Yup.string()
//     .required("Preenchimento obrigatório")
//     .oneOf([Yup.ref("password"), null], "Valor de confirmação incorreto"),
// };

// export const validateUpdate = Yup.object({
//   ...newForm,
//   password: Yup.string()
//     .notRequired()
//     .min(6, "Senha deve conter no mínimo 6 caracteres"),
//   passwordConfirm: Yup.string() // melhorara e confirmar .
//     .notRequired()
//     .oneOf([Yup.ref("password"), ""], "Valor de confirmação incorreto"),
// });

// export const validate = Yup.object(validateNew);

const UserForm: React.FC<{
  formikProps: FormikProps<IUsers> | FormikProps<any>;
  loadUser: IUsers;
}> = ({ formikProps, loadUser }) => {
  let { values, touched, handleChange, handleBlur, errors } = formikProps;

  return (
    <>
      <Row>
        <Form.Group as={Col} controlId="ctrlPrimeiroNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="primeiroNome"
            value={values.primeiroNome}
            placeholder="Primeiro Nome"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.primeiroNome && !!errors.primeiroNome}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primeiroNome}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="ctrlSobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            name="sobrenome"
            value={values.sobrenome}
            placeholder="Sobrenome"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.sobrenome && !!errors.sobrenome}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primeiroNome}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="ctrlEmail">
          <Form.Label>E-MAIL (login)</Form.Label>
          <Form.Control
            type="email"
            name="login"
            value={values.login}
            placeholder="E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.login && !!errors.login}
          />
          <Form.Control.Feedback type="invalid">
            {errors.login}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="ctrlWhatsApp">
          <Form.Label>WhatsApp</Form.Label>
          <Form.Control
            as={MaskedInput}
            mask={whatsAppMask}
            type="text"
            name="whatsApp"
            value={values.whatsApp}
            placeholder="[55](00)00000-0000"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.whatsApp && !!errors.whatsApp}
          />
          <Form.Control.Feedback type="invalid">
            {errors.whatsApp}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="ctrlPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            placeholder="Senha"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.password && !!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="ctrlPasswordConfirm">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            placeholder="Confirmar senha"
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
          />
          <Form.Control.Feedback type="invalid">
            {errors.passwordConfirm}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
};

export default UserForm;
