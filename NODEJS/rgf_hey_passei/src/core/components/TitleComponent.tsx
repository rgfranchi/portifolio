import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { AlertList } from "./AlertsComponent";

interface Props {
  title: string;
  description?: string;
  actions?: any;
}
/**
 * Mantém o titulo da página de acessando.
 * @param props Interface com informações do título da pagina.
 */
const TitleComponent: React.FC<Props> = (props) => {
  return (
    <>
      <Alert variant="primary">
        <Row className="justify-content-md-center">
          <Col lg="10">
            <Alert.Heading>{props.title}</Alert.Heading>
            {props.description ? props.description : ""}
          </Col>
          <Col md="2" className="text-center">
            {props.actions}
          </Col>
        </Row>
      </Alert>
      <AlertList />
    </>
  );
};
export default TitleComponent;
