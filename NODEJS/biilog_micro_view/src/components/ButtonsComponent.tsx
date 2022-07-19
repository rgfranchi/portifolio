/**
 * Matem botões bootstrap padronizados para aplicação utiliza biblioteca react-icons
 * https://react-bootstrap.github.io/components/buttons/
 * https://react-icons.github.io/react-icons/
 */
import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

interface IButtonIcon {
  icon?: any;
  variant?: string;
}

interface IButtonIconUpdate extends IButtonIcon {
  /**
   * Link de execução do botão
   */
  linkTo: string;
}
/**
 * Botão com ícone de UPDATE
 * @param props
 */
export const ButtonIconUpdate: React.FC<IButtonIconUpdate> = (props) => {
  return (
    <Button as={Link} to={props.linkTo} size="sm" variant={props.variant}>
      <FiEdit />
    </Button>
  );
};

interface IButtonIconDelete extends IButtonIcon {
  /**
   * Função para executar quando clicar no botão.
   */
  execute(): any;
}
/**
 * Botão com excluir executa função onClick.
 * @param props
 */
export const ButtonIconDelete: React.FC<IButtonIconDelete> = (props) => {
  return (
    <Button size="sm" variant="danger" onClick={props.execute}>
      <AiFillDelete />
    </Button>
  );
};

interface IButtonCreate {
  /**
   * Link de execução do botão
   */
  linkTo: string;
  /**
   * Texto para exibir no botão.
   */
  text?: string;
  variant?:
    | "primary"
    | "outline-primary"
    | "secondary"
    | "outline-secondary"
    | "success"
    | "outline-success"
    | "warning"
    | "outline-warning"
    | "danger"
    | "outline-danger"
    | "light"
    | "outline-light"
    | "link"
    | "outline-link";
}
export const ButtonCreate: React.FC<IButtonCreate> = (props) => {
  return (
    <Button
      as={Link}
      to={props.linkTo}
      variant={props.variant ? props.variant : "outline-primary"}
    >
      {props.text || "Cadastrar"}
    </Button>
  );
};

export interface IButtonList {
  id: string | number;
  text: string;
  execute: (event: any) => any;
  variant?:
    | "primary"
    | "outline-primary"
    | "secondary"
    | "outline-secondary"
    | "success"
    | "outline-success"
    | "warning"
    | "outline-warning"
    | "danger"
    | "outline-danger"
    | "light"
    | "outline-light"
    | "link"
    | "outline-link";
}

export interface IButtonsPanel {
  column?: number;
  list: IButtonList[];
}

export const ButtonsPanel: React.FC<IButtonsPanel> = (props) => {
  const arr = props.list;
  const column = props.column || 5;
  let totalLines = Math.ceil(arr.length / column);
  let resp = Array.apply(null, new Array(totalLines));
  let start = 0;
  let end = column;

  resp.forEach((value, key) => {
    resp[key] = arr.slice(start, end);
    start = end;
    end += column;
    return resp;
  });

  return (
    <>
      {resp.map((lines: any, line_key: number) => {
        return (
          <Row key={line_key}>
            {lines.map((column: any, column_key: number) => {
              return (
                <Col key={column_key}>
                  <Button
                    id={column.id}
                    key={column_key}
                    variant={column.variant ? column.variant : "primary"}
                    block={true}
                    onClick={column.execute}
                  >
                    {column.text}
                  </Button>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
};
