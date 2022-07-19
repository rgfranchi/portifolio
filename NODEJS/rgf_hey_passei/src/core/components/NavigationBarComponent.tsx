// @ts-nocheck
import React from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { ISessionAccess } from "../interfaces/SessionInterface";

/**
 * Interface de Construção do item.
 * count: posição do item.
 * value: valor de acesso.
 */
interface Item {
  count: number;
  value: ISessionAccess;
}

// criar estado de ativo para o menu ..
// considerar manter aberto o menu selecionado ..
// verificar funcionalidade no react-router-dom
// -- https://reactrouter.com/docs/en/v6/hooks/use-location

/**
 * Barra de navegação/Menu da aplicação.
 */
export const NavigationBarComponent: React.FC<{
  navigationMenuList: ISessionSlice;
  isAdministrator: boolean;
}> = ({ navigationMenuList, isAdministrator }) => {
  let [toggled, setToggled] = useState(false);
  return (
    <ul
      className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion${
        toggled ? " toggled" : ""
      }`}
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <Link
        to="/"
        className="sidebar-brand d-flex align-items-center justify-content-center"
        key="brand"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <Icon iconClass="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">
          HEY-PASSEI
          <sup>@</sup>
        </div>
      </Link>
      <hr key="nav_divider" className="sidebar-divider my-0"></hr>
      <NavBarItens key="nav_itens" dataAccess={navigationMenuList} />
      <div className="d-none d-md-inline text-center">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => {
            // console.log("Toggled Click:", toggled);
            setToggled(!toggled);
          }}
        ></button>
      </div>
    </ul>
  );
};

/**
 * Constrói valores do menu com 1 ou 2 níveis de acesso (sub_item).
 * @returns Conjunto de subitens.
 */
const NavBarItens: React.FC<{ dataAccess: ISessionAccess[] }> = ({
  dataAccess,
}) => {
  const location = useLocation();

  /**
   * Cria campo active, false (default) ou ativo para ('position' e 'subPosition').<br>
   * Se 'position' e/ou 'subPosition' from 'null' verifica o 'route' da aplicação. <br>
   * Obs: Recriar o array para uso do 'useState'
   * @param data array que compõe e menu. (exemplo no fim do arquivo)
   * @param position posição se ativo do primeiro menu
   * @param subPosition posição se ativo do submenu menu
   * @returns data com valores de ativo verdadeiro ou falso.
   */
  const addActiveInMenuAccess = (data, position = null, subPosition = null) => {
    // console.log("addActiveInMenuAccess:useLocation", location);
    return data.map((obj, pos) => {
      // console.log("addActiveInMenuAccess:obj", obj);
      if (position === null) {
        position =
          matchRoutes([{ path: `${obj.path}*` }], location)?.length > 0
            ? pos
            : position;
        // console.log("addActiveInMenuAccess:position", position);
      }
      if (obj.sub_item) {
        const new_sub = obj.sub_item.map((sub_obj, subPos) => {
          // console.log("addActiveInMenuAccess:sub_obj", sub_obj);
          if (position === null && subPosition === null) {
            if (matchRoutes([{ path: `${sub_obj.path}*` }], location)?.length) {
              position = pos;
              subPosition = subPos;
            }
          }
          if (position === pos && subPosition === subPos) {
            sub_obj = { ...sub_obj, active: true };
          } else {
            sub_obj = { ...sub_obj, active: false };
          }
          return sub_obj;
        });
        obj = { ...obj, sub_item: new_sub };
      }
      if (position === pos) {
        obj = { ...obj, active: true };
      } else {
        obj = { ...obj, active: false };
      }
      return obj;
    });
  };

  const [menuAccess, setMenuAccess] = useState(
    addActiveInMenuAccess(dataAccess)
  );
  // console.log("menuAccess", menuAccess);
  // insere opção de ativo para item selecionado do menu.
  const clickMenu = (position, subPosition = null) => {
    var tmpMenuAccess = addActiveInMenuAccess(
      menuAccess,
      position,
      subPosition
    );
    setMenuAccess(tmpMenuAccess);
    // console.log("tmpMenuAccess", tmpMenuAccess);
  };

  const ret = dataAccess.map((value: ISessionAccess, count: number) => {
    return value.sub_item ? (
      <ManyItem
        count={count}
        key={count}
        value={menuAccess[count]}
        clickMenu={clickMenu}
      />
    ) : (
      <SingleItem
        count={count}
        key={count}
        value={menuAccess[count]}
        clickMenu={clickMenu}
      />
    );
  });
  return ret;
};

/**
 * Constrói elemento com um nível de acesso.
 * @param param count [posição do item] e value [valores do item]
 * @returns Único item construído.
 */
const SingleItem: React.FC<Item> = ({ count, value, clickMenu }) => {
  // console.log("SingleItem:value", value);
  return (
    <SBAdminListMenu active={value.active}>
      <Link
        to={value.path}
        className="nav-link collapsed"
        key={count}
        onClick={() => clickMenu(count)}
      >
        <Icon iconClass={value.icon} />
        <Label text={value.label} />
      </Link>
    </SBAdminListMenu>
  );
};

/**
 * Constrói elemento com dois níveis de acesso.
 * @param param count [posição do item] e value [valores dos itens]
 * @returns Único item construído.
 */
const ManyItem: React.FC<Item> = ({ count, value, clickMenu }) => {
  // console.log("ManyItem:value", value);
  return (
    <Dropdown as={SBAdminListMenu} active={value.active}>
      <Dropdown.Toggle as={SBAdminDrownButton} id={count}>
        <Icon iconClass={value.icon} />
        <Label text={value.label} />
      </Dropdown.Toggle>
      <Dropdown.Menu as={SBAdminSubMenu} active={value.active}>
        {value.sub_item &&
          value.sub_item.map((sub_value: ISessionAccess, sub_key: number) => {
            return (
              <SubItem
                count={count}
                sub_value={sub_value}
                sub_key={sub_key}
                key={sub_key}
                clickMenu={clickMenu}
              />
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

/**
 * Carrega subitem.
 * @param param0
 * @returns
 */
const SubItem: React.FC<Item> = ({ count, sub_value, sub_key, clickMenu }) => {
  // console.log("SubItem:", sub_value);
  return (
    <Dropdown.Item
      key={sub_key}
      as={Link}
      to={sub_value.path || "/"}
      bsPrefix="collapse-item"
      className={`${sub_value.active ? "active" : ""}`}
      onClick={() => clickMenu(count, sub_key)}
    >
      {sub_value.label}
    </Dropdown.Item>
  );
};

/**
 * Carrega ícones da site https://fontawesome.com/icons
 */
const Icon = ({ iconClass }) => {
  return iconClass ? <i className={iconClass}></i> : "";
};

const Label = ({ text }) => {
  return <span>{text}</span>;
};

/**
 * Altera a div com conteúdo de apresentação.
 * Referencia: https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components
 */
const SBAdminDrownButton = React.forwardRef((props, ref) => {
  // console.log("SBAdminDrownButton", props);
  const href = "#";
  return (
    <a
      ref={ref}
      {...props}
      className={props["aria-expanded"] ? "nav-link" : "nav-link collapsed"}
      data-toggle="collapse"
      data-target="#aria-controls_2"
      aria-controls="aria-controls_2"
      href={href}
    >
      {props.children}
    </a>
  );
});

/**
 * Altera a div com conteúdo de apresentação.
 * Referencia: https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components
 */
const SBAdminSubMenu = React.forwardRef(
  ({ children, className, "aria-labelledby": labeledBy }, ref) => {
    // console.log("SBAdminSubMenu:className", className);
    return (
      <div
        ref={ref}
        className={`collapse ${className}`}
        aria-labelledby={labeledBy}
      >
        <div
          className="collapse-inner rounded bg-white py-2"
          style={{ margin: 0 }}
        >
          {children}
        </div>
      </div>
    );
  }
);

/**
 * Altera a list 'li' com conteúdo
 * Referencia: https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components
 */
const SBAdminListMenu = React.forwardRef(({ children, active }, ref) => {
  // console.log("SBAdminListMenu:active", active);
  return (
    <li className={`nav-item${active === true ? " active" : ""}`}>
      {children}
    </li>
  );
});

// Exemplo de objeto de leitura.
// [
//   {
//     "path": "my_account",
//     "label": "Minha Conta",
//     "page": {
//       "update": {
//           "path": "/update"
//         }
//       },
//     "sub_item": [{
//       "path": "configuracoes",
//       "label": "Configurações",
//       "icon": "fas fa-cogs fa-sm fa-fw"
//     }]
//   },
//   {
//     "path": "professor",
//     "label": "Pré-Cadastro",
//     "icon" : "fas fa-fw fa-table",
//     "page": {
//       "update": {
//         "path": "professorPreCadastro"
//       }
//     }
//   },
//   {
//     "path": "sub_menu",
//     "label": "Sub Menu",
//     "icon": "fas fa-fw fa-cog",
//     "sub_item": [
//       {
//         "path": "machine",
//         "label": "Máquina",
//         "page": {
//           "create": {
//             "path": "new",
//             "label": "Nova Máquina"
//           },
//           "update": {
//             "path": "update"
//           },
//           "delete": {
//             "path": "delete"
//           }
//         }
//       }
//     ]
//   }
//   ,
//   {
//     "path": "/sub_menu2",
//     "label": "Sub-Menu 2",
//     "icon": "fas fa-fw fa-wrench",
//     "sub_item": [
//       {
//         "path": "/operator",
//         "label": "Operador",
//         "page": {
//           "create": {
//             "path": "/new",
//             "label": "Novo Operador"
//           },
//           "update": {
//             "path": "/update"
//           },
//           "delete": {
//             "path": "/delete"
//           }
//         }
//       },
//       {
//         "path": "/module",
//         "label": "Módulo",
//         "page": {
//           "create": {
//             "path": "/new",
//             "label": "Novo Modulo"
//           },
//           "update": {
//             "path": "/update"
//           },
//           "delete": {
//             "path": "/delete"
//           }
//         }
//       }
//     ]
//   }
//   ]
