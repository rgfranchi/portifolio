import { Col, Form, Row } from "react-bootstrap";
import { findBy } from "./UserData";

const UserSearch = ({setListAll, setCountReloadList, countReloadList}) => {
    // Salva e chama atualização da lista.
    const seachBy = async (event) => {
        const varName = event.target.name;
        const varValue = event.target.value;
        if(varValue === "") {
          setCountReloadList(countReloadList + 1);
          return;
        } 
        console.log('NAME:',varName);
        console.log('VALUE:',varValue);
        // await findBy(varName, varValue);
        setListAll(await findBy(varName, varValue));
        // setCountReloadList(countReloadList+1);
    }
  
    return (
      <div>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                size="sm"
                type="text"
                name="nome"
                placeholder="NOME"
                onChange={seachBy}
              />            
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                size="sm"
                type="text"
                name="email"
                placeholder="E-MAIL"
                onChange={seachBy}
              />            
            </Form.Group>
          </Col>          
          <Col>
            <Form.Group>
              <Form.Control
                size="sm"
                type="text"
                name="telefone"
                placeholder="(99)99999-9999"
                onChange={seachBy}
              />            
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
  
  export default UserSearch;