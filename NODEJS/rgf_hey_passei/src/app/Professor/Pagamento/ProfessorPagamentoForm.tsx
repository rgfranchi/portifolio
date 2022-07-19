import { Formik, FormikProps, useFormikContext } from "formik";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { IFormCreateUpdate } from "../../../core/interfaces/FormInterface";
import * as Yup from "yup";
import {
  ButtonsPanel,
  IButtonList,
} from "../../../core/components/ButtonsComponent";
import { IProfessorPagamento } from "./ProfessorPagamentoData";
import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const ProfessorPagamentoForm: React.FC<
  IFormCreateUpdate<IProfessorPagamento>
> = ({ loadValues, initValues, submitForm }) => {
  const [tipoPagamento, setTipoPagamento] = useState<string>("");

  const tipoPagamentoButtons = [
    { name: "PIX", value: "PIX" },
    { name: "DOC", value: "DOC" },
    { name: "TED", value: "TED" },
  ];

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      // validationSchema={validate}
      onSubmit={submitForm}
    >
      {({ values, isValid, handleSubmit, handleChange, handleBlur }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Row>
              <ButtonGroup className="mb-2">
                {tipoPagamentoButtons.map((item, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`tipo_pagamento-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="chk_tipo_pagamento"
                    value={item.value}
                    checked={values.tipo == item.value}
                    onChange={(e) => setTipoPagamento(e.currentTarget.value)}
                  >
                    {item.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="ctrlDisciplina">
                <Form.Label>Informações:</Form.Label>
                <Form.Control
                  type="text"
                  name="chave"
                  value={values.chave}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="NUMERO PIX"
                />
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

export default ProfessorPagamentoForm;
