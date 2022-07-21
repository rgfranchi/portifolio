import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { findById } from "./UserData";
import { findAll } from "./UserData";

const UserList = ({setUserData, countReloadList, setDeleteId, setListAll, listAll}) => {
    const updateUser = async (id) => {
        const upUser =  await findById(id); 
        console.log(upUser);
        setUserData(upUser);
    }
    const deleteUser = async (id) => {
      setDeleteId(id);
    }

    useEffect(() => {
        const listValues = async () => {
            setListAll(await findAll());
        };
        listValues();        
    },[countReloadList])

    console.log(listAll);
    console.log(countReloadList);

    if(typeof listAll.data !== 'undefined') {
        return (
          <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Data Criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listAll.data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td>{item.telefone}</td>
                      <td>{dateFormat(item.data_criacao)}</td>
                      <td>
                        <Button variant="warning" onClick={() => updateUser(item.id)} >Update</Button>{' '}
                        <Button variant="danger" onClick={() => deleteUser(item.id)} >Delete</Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
      );
    }

}

const dateFormat = (date_time) => {
  console.log(date_time);
  const split_date_time = date_time.split("T")
  const date = split_date_time[0]
  const hora = split_date_time[1].split('.')[0];
  const split_date = date.split("-")

  var dd = split_date[2];
  var mm = split_date[1]; //January is 0!
  var yyyy = split_date[0];
  return `${dd}/${mm}/${yyyy} ${hora}`;
}

export default UserList;