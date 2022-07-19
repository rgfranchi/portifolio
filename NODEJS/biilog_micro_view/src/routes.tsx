import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { NavigationBarComponent } from "./components/NavigationBarComponent";

import {
  ModalConfirm,
  ModalFail,
  ModalSuccess,
} from "./components/ModalsComponent";

import PageNotFoundComponent from "./components/PageNotFoundComponent";
import LoginPage from "./Login/LoginPage";
import CompanyPage from "./Company/CompanyPage";
import OperatorPage from "./Operator/OperatorPage";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PageDevelopmentComponent from "./components/PageDevelopmentComponent";
import { ISessionAccess, ISessionSlice } from "./interfaces/SessionInterface";
import ReadSession from "./helper/SessionHelper";
import UserPage from "./User/UserPage";
import ForkliftPage from "./Forklift/ForkliftPage";

// @todo implementar import { CSSTransition, TransitionGroup } from "react-transition-group"; chapter08 reactshop React with Typescript Routes
/**
 * Contém as principais rotas da aplicação.
 */
const Routes: React.FC = () => {
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  if (currentSession.userId === 0) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} component={LoginPage} path={["/", "/login"]} />
          <Route
            component={PageDevelopmentComponent}
            path={["/recoverPassword"]}
          />
          <Route component={PageNotFoundComponent} path="*" />
        </Switch>
      </BrowserRouter>
    );
  }
  const pageAccess: ISessionAccess[] = new ReadSession(
    currentSession
  ).getAccess();
  return (
    <BrowserRouter>
      <ModalConfirm />
      <ModalFail />
      <ModalSuccess />
      <Row>
        <Col md="3" xl="2">
          <NavigationBarComponent
            company={currentSession.company}
            isAdministrator={currentSession.group.id.toString() === "1"}
          />
        </Col>
        <Col>
          <Switch>
            {pageAccess.map((value, key) => {
              let page: any;
              switch (value.path) {
                case "/company":
                  page = (props: any) => (
                    <CompanyPage {...props} access={value.page} />
                  );
                  break;
                case "/operator":
                  page = (props: any) => (
                    <OperatorPage {...props} access={value.page} />
                  );
                  break;
                case "/user":
                  page = (props: any) => (
                    <UserPage {...props} access={value.page} />
                  );
                  break;
                case "/forklift":
                  page = (props: any) => (
                    <ForkliftPage {...props} access={value.page} />
                  );
                  break;
                case "/checklist":
                  page = (props: any) => (
                    <PageDevelopmentComponent {...props} />
                  );
                  break;
              }
              return <Route key={key} render={page} path={value.path} />;
            })}
            <Route component={PageNotFoundComponent} path="*" />
          </Switch>
        </Col>
      </Row>
    </BrowserRouter>
  );
};
export default Routes;
