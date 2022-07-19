/**
 * Listagem das Entidades e operação de exclusão.
 * Pode incluir outras operações.
 */
import React from "react";
import { Table } from "react-bootstrap";
import {
  ButtonIconDelete,
  ButtonIconUpdate,
} from "../components/ButtonsComponent";
import { IListFunctionsAccess } from "../interfaces/ListInterface";
import { IForklift } from "./ForkliftData";

export const ForkliftList: React.FC<IListFunctionsAccess<IForklift>> = ({
  baseUrl,
  handleDeleteOpen,
  list,
  access,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Fabricante</th>
          <th>Modelo</th>
          <th>Cod. Modulo</th>
          <th>Ativo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.codigo}</td>
                <td>{item.fabricante}</td>
                <td>{item.modelo}</td>
                <td>{item.module.codigo}</td>
                <td>{item.module.ativo ? "Ativo" : "Inativo"}</td>
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
