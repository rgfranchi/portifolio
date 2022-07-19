/**
 * Listagem das Entidades e operação de exclusão.
 * Pode incluir outras operações.
 */
import React from "react";
import { Table } from "react-bootstrap";

import { IPessoa } from "./PessoaData";

import {
  ButtonIconUpdate,
  ButtonIconDelete,
} from "../../core/components/ButtonsComponent";
import { IListFunctionsAccess } from "../../core/interfaces/ListInterface";

/**
 * Entidade listagem de Empresas
 */
export const PessoaList: React.FC<IListFunctionsAccess<IPessoa>> = ({
  handleDeleteOpen,
  list,
  access,
}) => {
  // console.log(list);
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Idade</th>
          <th>Endereço</th>
          <th>Password</th>
          <th>Created</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: any) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.endereco}</td>
              <td>{item.password}</td>
              <td>{item.createdTime}</td>
              <td>
                {" "}
                {access.update && (
                  <ButtonIconUpdate linkTo={`update/${item.id}`} />
                )}{" "}
                {access.delete && (
                  <ButtonIconDelete execute={() => handleDeleteOpen(item.id)} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default PessoaList;
