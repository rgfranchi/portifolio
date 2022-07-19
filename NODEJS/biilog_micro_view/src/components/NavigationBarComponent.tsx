import React, { useEffect, useRef } from "react";
import { Link /* useHistory*/ } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeCompany } from "../redux/sessionSlice";
import { Logout } from "../Login/LoginService";
import { useState } from "react";
import { ICompanySlice, IState } from "../interfaces/ReduxInterface";
import { ISessionAccess } from "../interfaces/SessionInterface";
import { getDropdown } from "../Company/CompanyData";
import { fetchCompanies } from "../redux/companySlice";

/**
 * Barra de navegação/Menu da aplicação.
 */
export const NavigationBarComponent: React.FC<{
  company: ICompanySlice;
  isAdministrator: boolean;
}> = ({ isAdministrator, company }) => {
  return (
    <Navbar bg="light" variant="light">
      <Nav defaultActiveKey="/" className="flex-column">
        <Navbar.Brand as={Link} to="/">
          {company.nome.toUpperCase()}
        </Navbar.Brand>
        {isAdministrator && <SelectCompany currentCompany={company} />}
        <NavBarItens />
        <Logout />
      </Nav>
    </Navbar>
  );
};

const NavBarItens: React.FC = () => {
  const dataAccess: ISessionAccess[] = useSelector(
    (state: IState) => state.session.group.access
  );
  return (
    <Nav defaultActiveKey="/" className="flex-column">
      {dataAccess.map((value: ISessionAccess, key: number) => {
        return (
          <Nav.Item key={key}>
            {value.sub_item ? (
              <NavDropdown
                key={key}
                title={value.label}
                id={`navDropdown_id_${key}`}
              >
                {value.sub_item &&
                  value.sub_item.map(
                    (sub_value: ISessionAccess, sub_key: number) => {
                      return (
                        <NavDropdown.Item
                          key={sub_key}
                          as={Link}
                          to={sub_value.path || "/"}
                        >
                          {sub_value.label}
                        </NavDropdown.Item>
                      );
                    }
                  )}
              </NavDropdown>
            ) : (
              <Nav.Link key={key} as={Link} to={value.path || "/"}>
                {value.label}
              </Nav.Link>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

const SelectCompany: React.FC<{
  currentCompany: ICompanySlice;
}> = ({ currentCompany }) => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState<ICompanySlice>(currentCompany);
  const companiesDropdown = useRef<ICompanySlice[] | string>("");
  companiesDropdown.current = useSelector<IState, ICompanySlice[] | string>(
    (state) => state.companies,
    shallowEqual
  );
  useEffect(() => {
    const listDropdown = async () => {
      const data = await getDropdown();
      if (typeof data.response === "string") {
        companiesDropdown.current = data.response;
      } else {
        dispatch(fetchCompanies(data.response));
      }
    };
    listDropdown();
  }, [dispatch]);
  // controla a empresa na seção.
  const handlerChangeCompany = (id: number) => {
    if (typeof companiesDropdown.current === "string") {
      return;
    }
    const findCompany: ICompanySlice = companiesDropdown.current.find(
      (value: ICompanySlice) => {
        return value.id.toString() === id.toString();
      }
    ) as ICompanySlice;
    dispatch(changeCompany(findCompany));
    setCompany(findCompany);
  };
  return companiesDropdown.current.length === 0 ? (
    <div>Carregando Empresas</div>
  ) : (
    <Nav.Item>
      <NavDropdown title={company.nome} id="nav-dropdown-company">
        {typeof companiesDropdown.current == "string"
          ? companiesDropdown.current
          : companiesDropdown.current.map((values: ICompanySlice) => {
              return (
                <NavDropdown.Item
                  key={values.id}
                  eventKey={values.id.toString()}
                  onClick={() => handlerChangeCompany(values.id)}
                >
                  {values.nome}
                </NavDropdown.Item>
              );
            })}
      </NavDropdown>
    </Nav.Item>
  );
};
