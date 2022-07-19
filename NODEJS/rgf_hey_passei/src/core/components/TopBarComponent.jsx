import React from "react";
import { Button, Dropdown, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { confirmLogout } from "../../app/Login/LoginService";

export const TopBarComponent = ({ tobBarMenuList, userName }) => {
  console.log(tobBarMenuList);
  return (
    <Navbar
      className="topbar static-top mb-4 shadow"
      expanded={true}
      bg="white"
      static="top"
    >
      {/** Sidebar Toggle (Topbar)  */}
      <Button
        id="sidebarToggleTop"
        className="rounded-circle mr-3"
        variant="link"
      >
        <i className="fa fa-bars"></i>
      </Button>
      <form className="d-none d-sm-inline-block form-inline ml-md-3 my-md-0 mw-100 navbar-search my-2 mr-auto"></form>
      {/** Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        {/** Nav Item - User Information */}
        <UserInformation userName={userName} profile={tobBarMenuList} />
      </ul>
    </Navbar>
  );
};

const UserInformation = ({ userName, profile }) => {
  console.log("UserInformation:profile", profile);
  const dispatch = useDispatch();
  return (
    <NavDropdown
      as={SBAdminTopMenu}
      title={
        <span className="d-none d-lg-inline small mr-2 text-gray-600">
          {userName}
        </span>
      }
      id="basic-nav-dropdown"
    >
      <SBAdminDropdownProfile profile={profile} />
      <SBAdminDropdownSubMenu sub_item={profile.sub_item} />
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => confirmLogout(dispatch)}>
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

/**
 * Altera a list 'li' com conteúdo
 * Referencia: https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components
 */
const SBAdminTopMenu = React.forwardRef(({ children }, ref) => {
  console.log("SBAdminListMenu:children", children);
  return (
    <li ref={ref} className="nav-item dropdown no-arrow">
      {children}
    </li>
  );
});

/**
 * Cria acesso ao profile do usuário<br>
 * Verifica se tem acesso.
 */
const SBAdminDropdownProfile = ({ profile }) => {
  if (profile !== null) {
    return (
      <NavDropdown.Item as={Link} to={profile.path}>
        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
        {profile.label}
      </NavDropdown.Item>
    );
  }
  return null;
};

/**
 * Cria acesso aos item de configuração do usuário<br>
 * Verifica se tem acesso.
 */
const SBAdminDropdownSubMenu = ({ sub_item }) => {
  if (sub_item !== null && sub_item.length > 0) {
    return sub_item.map((value, index) => {
      return (
        <NavDropdown.Item as={Link} to={value.path} key={index}>
          <i className={`${value.icon} mr-2 text-gray-400`}></i>
          {value.label}
        </NavDropdown.Item>
      );
    });
  }
  return null;
};
