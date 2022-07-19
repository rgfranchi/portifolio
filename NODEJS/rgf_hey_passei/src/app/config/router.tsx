import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavigationBarComponent } from "../../core/components/NavigationBarComponent";

import {
  ModalConfirm,
  ModalFail,
  ModalSuccess,
} from "../../core/components/ModalsComponent";

import PageNotFoundComponent from "../../core/components/PageNotFoundComponent";
import LoginPage from "../Login/LoginPage";
// import { Logout } from "../Login/LoginService"; // para matar a sessão retirar ..
// import CompanyPage from "./Company/CompanyPage";
// import OperatorPage from "./Operator/OperatorPage";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import PageDevelopmentComponent from "../../core/components/PageDevelopmentComponent";
import {
  ISessionAccess,
  ISessionSlice,
} from "../../core/interfaces/SessionInterface";
import ReadSession from "../../core/helper/SessionHelper";
import RecoverPasswordPage from "../RecoverPassword/RecoverPasswordPage";
import { destroyAlerts } from "../../core/redux/slice/alertSlice";
import UserPage from "../User/UserPage";
import { logout } from "../redux/slice/sessionSlice";
import ProfessorPage from "../Professor/ProfessorPage";
import PessoaPage from "../Pessoa/PessoaPage";
import { ContentWrapper } from "../../core/components/ContentWrapper";
import { TopBarComponent } from "../../core/components/TopBarComponent";

/**
 * Contém rotas da aplicação.
 */
const Router: React.FC = () => {
  // controlar quanto executa erro e o modal está aberto.
  let dispatch = useDispatch();

  // dispatch(logout());

  dispatch(destroyAlerts());
  const currentSession: ISessionSlice = useSelector(
    (state: any) => state.session
  );
  console.log(currentSession);
  if (currentSession.userId === "") {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/teste/*"
            element={<PessoaPage access={{ create: { path: "/create" } }} />}
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recoverPassword" element={<RecoverPasswordPage />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/professor/*" element={<ProfessorPage />} />
          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }
  const readSession: any = ReadSession(currentSession);
  // console.log(pageAccess);

  // criar interação entre menubar e topbar
  // 'selecionar menu' e 'toggle' do barra lateral

  return (
    <BrowserRouter>
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <NavigationBarComponent
          navigationMenuList={readSession.navigationMenuList}
          isAdministrator={readSession.isAdministrator}
        />
        {/* Content Wrapper */}
        <ContentWrapper
          topBar={
            <TopBarComponent
              tobBarMenuList={readSession.tobBarMenuList}
              userName={readSession.userName}
            />
          }
          container={<div className="container-fluid">xxx</div>}
          footer={
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright my-auto text-center">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
          }
        />
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
      <ModalConfirm />
      <ModalFail />
      <ModalSuccess />
      {/* <Row>
        <Col md="3" xl="2">
          {
            // <NavigationBarComponent
            //   activeUser={currentSession.activeUser}
            //   isAdministrator={currentSession.group.name === "administrador"}
            // />
          }
        </Col>
        <Col>
          <Routes>
            {pageAccess.map((value, key) => {
              let pageComponent: any;
              console.log(value);
              if (value.page === undefined) {
                return <></>;
              }
              switch (value.path) {
                // case "pessoa":
                //   pageComponent = <PessoaPage access={value.page} />;
                //   break;
                case "user":
                  pageComponent = <UserPage access={value.page} />;
                  break;
                case "professor":
                  pageComponent = <ProfessorPage access={value.page} />;
                  break;
                case "pagina3":
                  pageComponent = <PageDevelopmentComponent />;
                  break;
                case "pagina4":
                  pageComponent = <PageDevelopmentComponent />;
                  break;
              }
              return (
                <Route
                  key={key}
                  path={value.path + "/*"}
                  element={pageComponent}
                />
              );
            })}
            <Route path="*" element={<PageNotFoundComponent />} />
          </Routes>
        </Col>
      </Row> */}
    </BrowserRouter>
  );
};
export default Router;
