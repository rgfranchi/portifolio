/**
 * Listagem das Entidades e operação de exclusão.
 * Pode incluir outras operações.
 */
import React from "react";
import { Table } from "react-bootstrap";

import { IUser } from "./UserData";
import { IListFunctionsAccess } from "../interfaces/ListInterface";

import {
  ButtonIconUpdate,
  ButtonIconDelete,
} from "../components/ButtonsComponent";

/**
 * Entidade listagem de Empresas
 */
export const UserList: React.FC<IListFunctionsAccess<IUser>> = ({
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
          <th>E-mail</th>
          <th>Grupo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.group ? item.group.nome : " - "}</td>
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
export default UserList;
