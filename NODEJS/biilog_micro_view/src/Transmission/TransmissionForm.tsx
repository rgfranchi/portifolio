import React from "react";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { Col, Form } from "react-bootstrap";

import { ITransmission } from "./TransmissionData";

export const validateTransmissionFormFields = Yup.object({
  tipo: Yup.string().required("Preenchimento obrigatório"),
});

export const TransmissionFormFields: React.FC<{
  formik: FormikProps<{ transmission: ITransmission }> | any;
}> = ({ formik }) => {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="ctrlTransmission_Tipo">
          <Form.Label>Tipo Transmissão</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.tipo"
            value={formik.values.module.transmission.tipo}
            placeholder="Tipo de transmissão"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.module &&
              formik.touched.module.transmission &&
              formik.touched.module.transmission.tipo &&
              !!(
                formik.errors.module &&
                formik.errors.module.transmission &&
                formik.errors.module.transmission.tipo
              )
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.module &&
              formik.errors.module.transmission &&
              formik.errors.module.transmission.tipo}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="ctrlTransmission_Fabricante">
          <Form.Label>Fabricante</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.fabricante"
            value={formik.values.module.transmission.fabricante}
            placeholder="Fabricante da Transmissão"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="ctrlTransmission_Modelo">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.modelo"
            value={formik.values.module.transmission.modelo}
            placeholder="Modelo Transmissão"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_Chip">
          <Form.Label>Chip</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.chip"
            value={
              formik.values.module.transmission.chip == null
                ? ""
                : formik.values.module.transmission.chip
            }
            placeholder="Chip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_Operadora">
          <Form.Label>Operadora</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.operadora"
            value={
              formik.values.module.transmission.operadora == null
                ? ""
                : formik.values.module.transmission.operadora
            }
            placeholder="Operadora"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_NumeroLinha">
          <Form.Label>Número Linha</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.numeroLinha"
            value={
              formik.values.module.transmission.numeroLinha == null
                ? ""
                : formik.values.module.transmission.numeroLinha
            }
            placeholder="(99)9999-9999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_Pin">
          <Form.Label>PIN</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.pin"
            value={
              formik.values.module.transmission.pin == null
                ? ""
                : formik.values.module.transmission.pin
            }
            placeholder="9999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="2" controlId="ctrlTransmission_Puk1">
          <Form.Label>PUK 1</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.puk1"
            value={
              formik.values.module.transmission.puk1 == null
                ? ""
                : formik.values.module.transmission.puk1
            }
            placeholder="99999999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="ctrlTransmission_Puk2">
          <Form.Label>PUK 2</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.puk2"
            value={
              formik.values.module.transmission.puk2 == null
                ? ""
                : formik.values.module.transmission.puk2
            }
            placeholder="99999999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="ctrlTransmission_Puk3">
          <Form.Label>PUK 3</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.puk3"
            value={
              formik.values.module.transmission.puk3 == null
                ? ""
                : formik.values.module.transmission.puk3
            }
            placeholder="99999999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_IMEI">
          <Form.Label>IMEI</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.imei"
            value={
              formik.values.module.transmission.imei == null
                ? ""
                : formik.values.module.transmission.imei
            }
            placeholder="99999999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="ctrlTransmission_PAN">
          <Form.Label>PAN</Form.Label>
          <Form.Control
            type="text"
            name="module.transmission.pan"
            value={
              formik.values.module.transmission.pan == null
                ? ""
                : formik.values.module.transmission.pan
            }
            placeholder="99999999"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="ctrlTransmission_observacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="module.transmission.observacoes"
            value={formik.values.module.transmission.observacoes}
            placeholder="Informações da transmissão ..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>
      </Form.Row>
    </>
  );
};
