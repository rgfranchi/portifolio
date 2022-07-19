/**
 * Formulário para operação de criar e atualizar Entidade.
 */
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Form, Button, Col, Accordion, Card } from "react-bootstrap";

import { IFormCreateUpdate } from "../interfaces/FormInterface";
import { IForklift } from "./ForkliftData";
import {
  ModuleFormAccordion,
  validateModuleFormFields,
} from "../Module/ModuleForm";

const validate = Yup.object({
  codigo: Yup.string().required("Preenchimento obrigatório"),
  module: validateModuleFormFields,
});

const ForkliftForm: React.FC<IFormCreateUpdate<IForklift>> = ({
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
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Equipamento
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} md="4" controlId="ctrlCodigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                      type="text"
                      name="codigo"
                      value={formik.values.codigo}
                      placeholder="Código do equipamento"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.codigo && !!formik.errors.codigo
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.codigo}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="ctrlFabricante">
                    <Form.Label>Fabricante</Form.Label>
                    <Form.Control
                      type="text"
                      name="fabricante"
                      value={formik.values.fabricante}
                      placeholder="Fabricante"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.fabricante && !!formik.errors.fabricante
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="ctrlModelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={formik.values.modelo}
                      placeholder="Modelo"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.modelo && !!formik.errors.modelo
                      }
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="3" controlId="ctrlMotor">
                    <Form.Label>Motor</Form.Label>
                    <Form.Control
                      type="text"
                      name="motor"
                      value={formik.values.motor}
                      placeholder="Motor"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="ctrlAnoFabricacao">
                    <Form.Label>Ano de Fabricação</Form.Label>
                    <Form.Control
                      type="text"
                      name="anoFabricacao"
                      value={formik.values.anoFabricacao}
                      placeholder="Ano"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.anoFabricacao &&
                        !!formik.errors.anoFabricacao
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="ctrlHorimetroInicial">
                    <Form.Label>Horímetro inicial</Form.Label>
                    <Form.Control
                      type="text"
                      name="horimetroInicial"
                      value={formik.values.horimetroInicial}
                      placeholder="Horímetro"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.horimetroInicial &&
                        !!formik.errors.horimetroInicial
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="ctrlHodometroInicial">
                    <Form.Label>Hodômetro inicial</Form.Label>
                    <Form.Control
                      type="text"
                      name="hodometroInicial"
                      value={formik.values.hodometroInicial}
                      placeholder="Hodômetro"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.hodometroInicial &&
                        !!formik.errors.hodometroInicial
                      }
                    />
                  </Form.Group>
                </Form.Row>
              </Card.Body>
            </Accordion.Collapse>
          </Accordion>
          <ModuleFormAccordion
            formik={formik}
            loadPlaces={loadValues.places}
            loadOperators={loadValues.operators}
          />
          {/* <Button type="submit" disabled={!(formik.dirty && formik.isValid)}> */}
          <Button type="submit" disabled={!formik.isValid}>
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForkliftForm;
