import { Formik, FormikProps, useFormikContext } from "formik";
import {
  Col,
  Row,
  Form,
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { IFormCreateUpdate } from "../../../core/interfaces/FormInterface";
import * as Yup from "yup";
import {
  ButtonsPanel,
  IButtonList,
} from "../../../core/components/ButtonsComponent";
import { IProfessorAcademica } from "./ProfessorAcademicaData";
import {
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  FormEvent,
} from "react";
import { ProfessorAcademica } from "../__MODELO_PROFESSOR_SUB/ProfessorAcademicaService";
import { bsSizes } from "react-bootstrap/lib/utils/bootstrapUtils";

const ProfessorAcademicaForm: React.FC<
  IFormCreateUpdate<IProfessorAcademica>
> = ({ loadValues, initValues, submitForm }) => {
  const [disponibilidade, setDisponibilidade] = useState("");

  const findInstituicao = (e: any) => {
    console.log("Find Instituição", e.target);
  };

  const loadInstituicao = () => {
    console.log("You clicked the third ListGroupItem");
  };

  const disponibilidadeButtons = [
    { name: "SEG", value: "SEG" },
    { name: "TER", value: "TER" },
    { name: "QUA", value: "QUA" },
    { name: "QUI", value: "QUI" },
    { name: "SEX", value: "SEX" },
    { name: "SAB", value: "SAB" },
    { name: "DOM", value: "DOM" },
  ];

  const tipoServicoButtons = [
    { name: "Aulas Particulares", value: "AULAS_PARTICULARES" },
    { name: "Atividades Online", value: "ATIVIDADES_ONLINE" },
    { name: "Trabalhos Acadêmicos", value: "TRABALHOS_ACADEMICOS" },
  ];

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      handleChange={findInstituicao}
      // validationSchema={validate}
      onSubmit={submitForm}
    >
      {({ values, isValid, handleSubmit, handleChange, handleBlur }) => {
        {
          console.log(values);
        }
        return (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="6" controlId="ctrlFormacao">
                <Form.Label>Formação</Form.Label>
                <Form.Control
                  type="text"
                  name="formacao"
                  value={values.formacao}
                  placeholder="Engenharia de Produção"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="ctrlInstituicao">
                <Form.Label>Instituição</Form.Label>
                <InputGroup>
                  <Col md="3">
                    <FormControl
                      type="text"
                      name="instituicao_sigla"
                      value={values.instituicao_sigla}
                      placeholder="Sigla"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col>
                    <FormControl
                      type="text"
                      name="instituicao"
                      value={values.instituicao}
                      placeholder="Nome Instituição"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                </InputGroup>

                {/* carregar instituições <ListGroup as="ul">
                  <ListGroup.Item as="li" action onClick={loadInstituicao}>
                    Cras justo odio
                  </ListGroup.Item>
                  <ListGroup.Item as="li" action onClick={loadInstituicao}>
                    Dapibus ac facilisis in
                  </ListGroup.Item>
                  <ListGroup.Item as="li" action onClick={loadInstituicao}>
                    Morbi leo risus
                  </ListGroup.Item>
                  <ListGroup.Item as="li" action onClick={loadInstituicao}>
                    Porta ac consectetur ac
                  </ListGroup.Item>
                </ListGroup> */}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="ctrlDisponibilidade">
                <Form.Label>Disponibilidade</Form.Label>
                <ButtonGroup className="mb-2">
                  {disponibilidadeButtons.map((item, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`disponibilidade-${idx}`}
                      type="checkbox"
                      variant="outline-primary"
                      name="chk_disponibilidade"
                      value={item.value}
                      checked={values.disponibilidade.some(
                        (d: string) => d === item.value
                      )}
                      onChange={(e) =>
                        setDisponibilidade(e.currentTarget.value)
                      }
                    >
                      {item.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="ctrlHorário">
                <Form.Label>Horário</Form.Label>
                <InputGroup>
                  <Col md="3">
                    <FormControl
                      type="text"
                      name="horario_inicial"
                      value={values.horario_inicial}
                      placeholder="00:00"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col md="3">
                    <FormControl
                      type="text"
                      name="horario_final"
                      value={values.horario_final}
                      placeholder="23:59"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="ctrlTipoServico">
                <Form.Label>Tipo Serviço</Form.Label>
                <ButtonGroup className="mb-2">
                  {tipoServicoButtons.map((item, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`tipo_servico-${idx}`}
                      type="checkbox"
                      variant="outline-primary"
                      name="chk_tipo_servico"
                      value={item.value}
                      checked={values.tipo_servico.some(
                        (d: string) => d === item.value
                      )}
                      onChange={(e) =>
                        setDisponibilidade(e.currentTarget.value)
                      }
                    >
                      {item.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
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

export default ProfessorAcademicaForm;
