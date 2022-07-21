import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalAlert from "./ModalAlert";
import UserForm from "./UserForm";
import UserList from "./UserList";
import UserSearch from "./UserSearch";
import { Accordion } from "react-bootstrap";

const UserPage = () => {
  const [listAll, setListAll] = useState([]);
  const [countReloadList, setCountReloadList] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [message, setMessage] = useState("");
  const emptyData = { 
    nome: "",
    telefone: "",
    email: "",
    data_criacao: new Date().toISOString(),
    senha: ""
  };
  const [userData, setUserData] = useState(emptyData);

  return (
    <div>
      <ModalAlert setMessage={setMessage} message={message} setCountReloadList={setCountReloadList} countReloadList={countReloadList} />
      <ModalDelete setDeleteId={setDeleteId} deleteId={deleteId} setCountReloadList={setCountReloadList} countReloadList={countReloadList} setMessage={setMessage} />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>CADASTRO</Accordion.Header>
          <Accordion.Body>
            <UserForm setUserData={setUserData} userData={userData} emptyData={emptyData} setCountReloadList={setCountReloadList} countReloadList={countReloadList} setMessage={setMessage}  />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>BUSCA</Accordion.Header>
          <Accordion.Body>
          <UserSearch setListAll={setListAll} setCountReloadList={setCountReloadList} countReloadList={countReloadList} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>      
      <UserList setListAll={setListAll} listAll={listAll} setUserData={setUserData} countReloadList={countReloadList} setDeleteId={setDeleteId} setMessage={setMessage} />
    </div>
  );
}

export default UserPage;