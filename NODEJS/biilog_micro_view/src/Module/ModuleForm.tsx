import React from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { Accordion, Card, Col, Form } from "react-bootstrap";

import { IModule } from "./ModuleData";
import {
  TransmissionFormFields,
  validateTransmissionFormFields,
} from "../Transmission/TransmissionForm";
import { FromSelect, IFormSelectValue } from "../components/FormsComponent";
import OperatorPanelForm from "../Operator/OperatorPanelForm";
import { IOperator } from "../Operator/OperatorData";

export const validateModuleFormFields = Yup.object({
  codigo: Yup.string().required("Preenchimento obrigatório"),
  transmission: validateTransmissionFormFields,
});

export const ModuleFormAccordion: React.FC<{
  formik: FormikProps<{ module: IModule }> | any;
  loadPlaces: IFormSelectValue[];
  loadOperators: IOperator[];
}> = ({ formik, loadPlaces, loadOperators }) => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Operadores
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <OperatorPanelForm formik={formik} loadOperators={loadOperators} />
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Módulo
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <ModuleFormFields formik={formik} loadPlaces={loadPlaces} />
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Transmissão
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <TransmissionFormFields formik={formik} />
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </>
  );
};

export const ModuleFormFields: React.FC<{
  formik: FormikProps<{ module: IModule }> | any;
  loadPlaces: IFormSelectValue[];
}> = ({ formik, loadPlaces }) => {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="ctrlModule_Codigo">
          <Form.Label>Código Modulo</Form.Label>
          <Form.Control
            type="text"
            name="module.codigo"
            value={formik.values.module.codigo}
            placeholder="Código do módulo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.module &&
              formik.touched.module.codigo &&
              !!(formik.errors.module && formik.errors.module.codigo)
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.module && formik.errors.module.codigo}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="1" controlId="ctrlModule_ativo">
          <Form.Label>Ativo</Form.Label>
          <Form.Control
            as="button"
            name="module.ativo"
            // type="button"
            onClick={(event: any) => {
              event.preventDefault();
              formik.values.module.ativo
                ? (formik.values.module.ativo = false)
                : (formik.values.module.ativo = true);
              formik.setFieldValue("module.ativo", formik.values.module.ativo);
            }}
            className={`btn btn-${
              formik.values.module.ativo ? "success" : "danger"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {formik.values.module.ativo ? "Ativo" : "Inativo"}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlModule_modelo">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            name="module.modelo"
            value={formik.values.module.modelo}
            placeholder="Modelo Modulo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // isInvalid={touched.modelo && !!errors.modelo}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlModule_fabricante">
          <Form.Label>Fabricante</Form.Label>
          <Form.Control
            type="text"
            name="module.fabricante"
            value={formik.values.module.fabricante}
            placeholder="Fabricante do módulo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.fabricante && !!formik.errors.fabricante}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="ctrlModule_Place">
          <Form.Label>Localização</Form.Label>
          <FromSelect
            name="module.placeId"
            value={formik.values.module.placeId}
            dataList={loadPlaces}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.placeId && !!formik.errors.placeId}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row></Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="ctrlModule_observacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="module.observacoes"
            value={formik.values.module.observacoes}
            placeholder="Informações do módulo ..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      </Form.Row>
    </>
  );
};
