import { Formik, FormikProps, useFormikContext } from "formik";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { IFormCreateUpdate } from "../../../core/interfaces/FormInterface";
import * as Yup from "yup";
import {
  ButtonsPanel,
  IButtonList,
} from "../../../core/components/ButtonsComponent";
import { IProfessorApresentacao } from "./ProfessorApresentacaoData";
import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const ProfessorApresentacaoForm: React.FC<
  IFormCreateUpdate<IProfessorApresentacao>
> = ({ loadValues, initValues, submitForm }) => {
  const formikRef = useRef<FormikProps<IProfessorApresentacao>>(null);

  const uploadBase64file = (file: any): any => {
    console.log(file.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      console.log(reader.result);
      formikRef.current!.values.arquivoApresentacao = reader.result as string;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  console.log(loadValues);
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValues}
      enableReinitialize={true}
      // validationSchema={validate}
      onSubmit={submitForm}
    >
      {({ values, isValid, handleSubmit, handleChange, handleBlur }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Card>
                <Card.Body>
                  This is some text within a card body. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Quisque eget nibh enim.
                  Donec nec velit at urna tincidunt volutpat. Nulla facilisi.
                  Aenean tincidunt urna quam, pharetra aliquet dolor tristique
                  a. Aenean a ipsum felis. Ut et ipsum id quam cursus
                  consectetur vel non urna. Vivamus a velit vulputate, varius
                  odio sit amet, mattis nunc. Mauris sed accumsan turpis. Fusce
                  condimentum nulla sapien. Donec urna metus, varius et sodales
                  quis, maximus sed orci. Pellentesque at erat ut risus iaculis
                  hendrerit. Sed dapibus non velit ac accumsan. Nulla at mauris
                  sit amet neque congue vulputate. Sed varius dolor at ipsum
                  euismod commodo. Nam pulvinar mauris felis, et finibus libero
                  suscipit at. Praesent vel mauris sed velit ultricies mattis a
                  vitae lorem.
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="ctrlArquivo">
                <Form.Control
                  type="file"
                  name="loadFile"
                  accept="application/*, text/plain, .docx, .odt, .ods"
                  onChange={uploadBase64file}
                  onBlur={handleBlur}
                  // isInvalid={touched.arquivo && !!errors.arquivo}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="ctrlArquivoApresentacao">
                {console.log(values.arquivoApresentacao)}
                {values.arquivoApresentacao === undefined ||
                values.arquivoApresentacao === ""
                  ? "Selecione um Documento de apresentação"
                  : "Arquivo Selecionado"}
              </Form.Group>
            </Row>
            <Button type="button" onClick={loadValues.backButton}>
              Voltar
            </Button>
            <Button className="float-end" type="submit" disabled={!isValid}>
              Proxima
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfessorApresentacaoForm;
