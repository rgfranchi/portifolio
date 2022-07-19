/**
 * Listagem das Entidades e operação de exclusão.
 * Pode incluir outras operações.
 */
import React from "react";
import { Table } from "react-bootstrap";
import format from "date-fns/format";

import { IOperator } from "./OperatorData";

import {
  ButtonIconUpdate,
  ButtonIconDelete,
} from "../components/ButtonsComponent";
import { IListFunctionsAccess } from "../interfaces/ListInterface";

/**
 * Entidade listagem de Empresas
 */
export const OperatorList: React.FC<IListFunctionsAccess<IOperator>> = ({
  baseUrl,
  handleDeleteOpen,
  list,
  access,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Codigo</th>
          <th>Função</th>
          <th>Acesso Final</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.codOperador}</td>
                <td>{item.funcao}</td>
                <td>
                  {format(
                    new Date(item.acessoDataFinal + "T00:00:00"),
                    "dd/MM/yy"
                  )}
                </td>
                <td>
                  {access.update && (
                    <ButtonIconUpdate linkTo={`${baseUrl}/update/${item.id}`} />
                  )}{" "}
                  {access.delete && (
                    <ButtonIconDelete
                      execute={() => handleDeleteOpen(item.id)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default OperatorList;
