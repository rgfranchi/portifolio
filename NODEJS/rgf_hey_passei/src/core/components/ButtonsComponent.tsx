/**
 * Matem botões bootstrap padronizados para aplicação utiliza biblioteca react-icons
 * https://react-bootstrap.github.io/components/buttons/
 * https://react-icons.github.io/react-icons/
 */
import * as React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MouseEventHandler } from "react";
import { CSSProperties } from "react";

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
    <LinkContainer to={props.linkTo}>
      <Button variant={props.variant} size="sm">
        <FiEdit />
      </Button>
    </LinkContainer>
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
    <LinkContainer to={props.linkTo}>
      <Button variant={props.variant ? props.variant : "outline-primary"}>
        {props.text || "Cadastrar"}
      </Button>
    </LinkContainer>
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

/**
 * column: numero de colunas, máximo 12
 * styleCol: estilo css da coluna.
 * styleRow: estilo css da linha.
 * styleButton: estilo css botão.
 * myButton: substitui o botão.
 * list: lista de botões para exibir.
 */
export interface IButtonsPanel {
  column?: number;
  styleCol?: CSSProperties;
  styleRow?: CSSProperties;
  styleButton?: CSSProperties;
  myButton?: any;
  list: IButtonList[];
}

/**
 * Cria painel com botões.
 * @param props IButtonsPanel
 * @returns
 */
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

  let myButton = (
    id: string,
    column_key: string,
    text: string,
    execute: MouseEventHandler<HTMLButtonElement>,
    variant?: string
  ) => {
    return (
      <Button
        style={props.styleButton}
        id={id}
        key={column_key}
        variant={variant ? variant : "primary"}
        onClick={execute}
      >
        {text}
      </Button>
    );
  };

  const loadButton = props.myButton ?? myButton;

  return (
    <>
      {resp.map((lines: any, line_key: number) => {
        return (
          <Row key={line_key} style={props.styleRow}>
            {lines.map((column: any, column_key: any) => {
              return (
                <Col key={column_key} style={props.styleCol}>
                  {loadButton(
                    column.id,
                    column_key,
                    column.text,
                    column.execute,
                    column.variant
                  )}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
};
