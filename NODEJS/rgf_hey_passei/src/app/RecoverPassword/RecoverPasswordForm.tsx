import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { AlertList } from "../../core/components/AlertsComponent";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import { IRecoverPassword } from "./RecoverPasswordData";

const RecoverPasswordForm: React.FC<IFormCreateUpdate<IRecoverPassword>> = ({
  initValues,
  submitForm,
}) => {
  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      onSubmit={submitForm}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="login"
                name="login"
                value={values.login}
                placeholder="E-mail cadastrado"
                onChange={handleChange}
                isInvalid={touched.login && !!errors.login}
              />
            </Form.Group>
            <AlertList />
            <Form.Group>
              <Button type="submit" disabled={!isValid}>
                Solicitar Acesso
              </Button>{" "}
              <Button href="/" disabled={!isValid}>
                Retornar
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RecoverPasswordForm;
