import { Formik, FormikProps, useFormikContext } from "formik";
import {
  Col,
  Row,
  Form,
  Button,
  Card,
  Image,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { IFormCreateUpdate } from "../../../core/interfaces/FormInterface";
import * as Yup from "yup";
import {
  ButtonsPanel,
  IButtonList,
} from "../../../core/components/ButtonsComponent";
import { IProfessorDocumento } from "./ProfessorDocumentoData";
import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Resizer from "react-image-file-resizer";

const ProfessorDocumentoForm: React.FC<
  IFormCreateUpdate<IProfessorDocumento>
> = ({ loadValues, initValues, submitForm }) => {
  const [tipoDocumento, setTipoDocumento] = useState<string>("");

  const formikRef = useRef<FormikProps<IProfessorDocumento>>(null);

  const resizeImageBase64 = (file: any): any => {
    console.log(file);
    // setSelectedFile(file.target.files[0]);
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
      console.log(formikRef.current);
      formikRef.current!.values.fotoDocumento = res;
    });
  };

  const tipoDocumentoButtons = [
    { name: "CPF", value: "CPF" },
    { name: "RG", value: "RG" },
    { name: "CNH", value: "CNH" },
    { name: "PASSAPORTE", value: "PASSAPORTE" },
  ];

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
                <Card.Body>Imagem de exemplo.......</Card.Body>
              </Card>
            </Row>
            <Row>
              <ButtonGroup className="mb-2">
                {tipoDocumentoButtons.map((item, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`tipo_documento-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="chk_tipo_documento"
                    value={item.value}
                    checked={values.tipoDocumento === item.value}
                    onChange={(e) => setTipoDocumento(e.currentTarget.value)}
                  >
                    {item.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="ctrlNumeroDocumento">
                <Form.Label>Numero do Documento:</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroDocumento"
                  value={values.numeroDocumento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="NUMERO DO DOCUMENTO"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="ctrlArquivoDocumento">
                <Form.Label>Foto Documento</Form.Label>
                <Form.Control
                  type="file"
                  name="ctrlArquivoDocumento"
                  accept="image/*"
                  onChange={resizeImageBase64}
                  onBlur={handleBlur}
                  // isInvalid={touched.arquivo && !!errors.arquivo}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="ctrlImagemDocumento">
                {values.fotoDocumento === "" ? (
                  "Selecione uma Imagem"
                ) : (
                  <Image
                    src={values.fotoDocumento}
                    alt="base64img"
                    style={{
                      maxHeight: 100,
                      border: 20,
                      borderColor: "green",
                    }}
                  />
                )}
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

export default ProfessorDocumentoForm;
