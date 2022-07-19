import React from "react";
import Router from "./app/config/router";
import { ModalLoading } from "./core/components/ModalsComponent";

const App = () => {
  return (
    <React.Fragment>
      <ModalLoading />
      <Router />
    </React.Fragment>
  );
};

export default App;
