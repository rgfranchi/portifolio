/**
 * Listagem das Entidades e operação de exclusão.
 * Pode incluir outras operações.
 */
import React from "react";
import { Table } from "react-bootstrap";

import { ICompany } from "./CompanyData";

import {
  ButtonIconUpdate,
  ButtonIconDelete,
} from "../components/ButtonsComponent";
import { IListFunctionsAccess } from "../interfaces/ListInterface";

/**
 * Entidade listagem de Empresas
 */
export const CompanyList: React.FC<IListFunctionsAccess<ICompany>> = ({
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
          <th>Contato</th>
          <th>CNPJ</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.nomeContato}</td>
                <td>{item.cnpj}</td>
                <td>{item.email}</td>
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
export default CompanyList;
