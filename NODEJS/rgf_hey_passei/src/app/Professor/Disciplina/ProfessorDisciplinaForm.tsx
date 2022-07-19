import { Formik, FormikProps, useFormikContext } from "formik";
import { Col, Row, Form, Button } from "react-bootstrap";
import { IFormCreateUpdate } from "../../../core/interfaces/FormInterface";
import * as Yup from "yup";
import {
  ButtonsPanel,
  IButtonList,
} from "../../../core/components/ButtonsComponent";
import { IProfessorDisciplina } from "./ProfessorDisciplinaData";
import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const ProfessorDisciplinaForm: React.FC<
  IFormCreateUpdate<IProfessorDisciplina>
> = ({ loadValues, initValues, submitForm }) => {
  // console.log("FORM", initValues);
  const formikRef = useRef<FormikProps<IProfessorDisciplina>>(null);
  // console.log("FORMIK REF:", formikRef);
  let listDisciplinaId = initValues.disciplina;
  const disciplina_click = (events: MouseEvent<IButtonList>) => {
    const selected_id = events.currentTarget.id as string;
    if (listDisciplinaId === undefined) {
      listDisciplinaId = [];
    }
    const index = listDisciplinaId.findIndex((disc) => disc.id === selected_id);
    // console.log("selected_id:", selected_id);
    // console.log("index:", index);
    if (index === -1) {
      listDisciplinaId.push({ id: selected_id });
      (events.target as Element).classList.replace(
        "btn-secondary",
        "btn-success"
      );
    } else {
      listDisciplinaId.splice(index, 1);
      (events.target as Element).classList.replace(
        "btn-success",
        "btn-secondary"
      );
    }
    // console.log(listDisciplinaId);
    formikRef.current!.values.disciplina = listDisciplinaId;
  };

  let loadButtons: IButtonList[] = [];

  // recebe ids dos objetos.
  // console.log(initValues.disciplina);
  const arrDisciplinaId = initValues.disciplina?.map((val) => val.id);
  initValues.disciplinas!.forEach((value, index) => {
    loadButtons[index] = {
      id: value.id,
      text: value.disciplina!,
      execute: disciplina_click,
      variant: arrDisciplinaId?.includes(value.id) ? "success" : "secondary",
    };
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initValues}
      enableReinitialize={true}
      // validationSchema={validate}
      onSubmit={submitForm}
    >
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <Row>
              <Form.Group as={Col} controlId="ctrlDisciplina">
                <Form.Label>DISCIPLINA</Form.Label>
                <ButtonsPanel
                  column={4}
                  list={loadButtons}
                  styleButton={{
                    border: 0,
                    padding: 0,
                    minHeight: 10,
                    fontSize: 13,
                  }}
                  styleCol={{ display: "grid", padding: 1 }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="ctrlDisciplinaOutras">
                <Form.Control
                  type="text"
                  name="disciplina_outras"
                  value={formikProps.values.disciplina_outras}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  placeholder="OUTRAS DISCIPLINAS"
                />
              </Form.Group>
            </Row>
            <Button type="button" onClick={loadValues.backButton}>
              Voltar
            </Button>
            <Button
              className="float-end"
              type="submit"
              disabled={!formikProps.isValid}
            >
              Proxima
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfessorDisciplinaForm;
