import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Routes from "./routes";
import { ModalLoading } from "./components/ModalsComponent";

/**
 * Função inicial da aplicação.
 */
const App = () => {
  return (
    <Container>
      <React.Fragment>
        <ModalLoading />
        <Routes />
      </React.Fragment>
    </Container>
  );
};
export default App;
