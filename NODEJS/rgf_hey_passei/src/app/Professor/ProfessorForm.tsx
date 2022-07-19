import { Formik, FormikProps } from "formik";
import { Col, Row, Form, Button, Image } from "react-bootstrap";
import { IFormCreateUpdate } from "../../core/interfaces/FormInterface";
import MaskedInput from "react-text-mask";
import { CEPMask, findCEP } from "../../core/helper/CEPHelper";
import { loadingModal } from "../../core/redux/slice/modalSlice";
import { useDispatch } from "react-redux";
import UserForm, { validateNew, validateUpdate } from "../User/UserForm";
import { IProfessor } from "./ProfessorData";
import { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";

const ProfessorForm: React.FC<IFormCreateUpdate<IProfessor>> = ({
  initValues,
  submitForm,
}) => {
  let dispatch = useDispatch();
  const formikRef = useRef<FormikProps<IProfessor>>(null);

  // const [selectedFile, setSelectedFile] = useState<any>(undefined);

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
      formikRef.current!.values.fotoCadastro = res;
    });
  };

  /**
   * Localiza Endereço e preenche valores na tela.
   * @param values
   */
  const findCodPostal = async (values: IProfessor) => {
    const codPostal = values.codPostal;
    if (codPostal.replace(/_/g, "").length === 9) {
      dispatch(loadingModal({ show: true, message: "Carregando CEP ... " }));
      await findCEP(codPostal)
        .then((resp) => {
          values.cidade = "";
          values.logradouro = "";
          values.bairro = "";
          if (typeof resp.response != "string") {
            values.pais = "Brasil";
            values.estado = resp.response.uf;
            values.cidade = resp.response.localidade;
            values.bairro = resp.response.bairro;
            values.logradouro = resp.response.logradouro;
          }

          console.log(values);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(loadingModal({ show: false }));
        });
    }
  };

  let validate: any = null;
  if (initValues.id !== "") {
    validate = validateUpdate;
  } else {
    validate = validateNew;
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={submitForm}
    >
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <UserForm formikProps={formikProps} loadUser={initValues} />
            <Row>
              <Form.Group as={Col} md="2" controlId="ctrlCodPostal">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  as={MaskedInput}
                  type="text"
                  name="codPostal"
                  value={formikProps.values.codPostal}
                  placeholder="00000-000"
                  onChange={formikProps.handleChange}
                  onBlur={async (event: any) => {
                    if (!formikProps.errors.codPostal) {
                      await findCodPostal(formikProps.values);
                    }
                    formikProps.handleBlur(event);
                  }}
                  isInvalid={
                    formikProps.touched.codPostal &&
                    !!formikProps.errors.codPostal
                  }
                  mask={CEPMask}
                />
                <Form.Control.Feedback type="invalid">
                  {formikProps.errors.codPostal}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="ctrlEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  name="estado"
                  value={formikProps.values.estado}
                  placeholder="Estado"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="ctrlCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  value={formikProps.values.cidade}
                  placeholder="Cidade"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="ctrlBairro">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="bairro"
                  value={formikProps.values.bairro}
                  placeholder="Bairro"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="ctrlPais">
                <Form.Label>Pais</Form.Label>
                <Form.Control
                  type="text"
                  name="pais"
                  value={formikProps.values.pais}
                  placeholder="Pais"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="8" controlId="ctrlLogradouro">
                <Form.Label>Logradouro</Form.Label>
                <Form.Control
                  type="text"
                  name="logradouro"
                  value={formikProps.values.logradouro}
                  placeholder="Logradouro"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="ctrlNumero">
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="text"
                  name="numero"
                  value={formikProps.values.numero}
                  placeholder="Numero"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="ctrlComplemento">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  name="complemento"
                  value={
                    formikProps.values.complemento == null
                      ? ""
                      : formikProps.values.complemento
                  }
                  placeholder="Complemento"
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
              </Form.Group>
            </Row>

            <Row>
              {/* {selectedFile ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>Base64: {formikProps.values.fotoCadastro}</p>
                </div>
              ) : (
                ""
              )} */}

              {/* todo: Upload de arquivo para o google. TESTE em ../core/helper  */}
              <Form.Group as={Col} controlId="ctrlArquivoCadastro">
                <Form.Label>Foto Apresentação</Form.Label>
                <Form.Control
                  type="file"
                  name="ctrlArquivoCadastro"
                  accept="image/*"
                  onChange={resizeImageBase64}
                  onBlur={formikProps.handleBlur}
                  // isInvalid={touched.arquivo && !!errors.arquivo}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="ctrlImagemCadastro">
                {formikProps.values.fotoCadastro === "" ? (
                  "Selecione uma Imagem"
                ) : (
                  <Image
                    src={formikProps.values.fotoCadastro}
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

            <Button type="submit" disabled={!formikProps.isValid}>
              Salvar
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfessorForm;
