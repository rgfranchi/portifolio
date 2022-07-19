import { Formik } from "formik";
import { Col, Row, Form, Button } from "react-bootstrap";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import { IUsers } from "./UserData";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { ModalSuccess } from "../../core/components/ModalsComponent";
import UserForm, { validateNew, validateUpdate } from "./UserForm";

const UserAlunoForm: React.FC<IFormCreateUpdate<IUsers>> = ({
  initValues,
  submitForm,
}) => {
  let validate: any = null;
  if (initValues.id !== "") {
    validate = validateUpdate;
  } else {
    validate = validateNew;
  }

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={submitForm}
    >
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <UserForm formikProps={formikProps} loadUser={initValues} />
            <Button type="submit" disabled={!formikProps.isValid}>
              Salvar
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserAlunoForm;
