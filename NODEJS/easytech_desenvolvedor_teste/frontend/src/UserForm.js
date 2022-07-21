import { Button, Col, Form, Row } from "react-bootstrap";
import { save } from "./UserData";


const UserForm = ({setUserData , userData, emptyData, setCountReloadList, countReloadList, setMessage }) => {
  // Salva e chama atualização da lista.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
    const ret = await save(userData);
    setCountReloadList(countReloadList + 1);
    setUserData(emptyData);
    setMessage(`Usuário:${ret.data.message}` );
  }
  // mantém valores atualizado no objeto userData
  const handleChange = (event) => {
    const newValue = {};
    newValue[event.target.name] = event.target.value
    console.log(newValue);
    console.log(userData);
    setUserData({ ...userData, ...newValue});
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="nome"
                value={userData.nome}
                placeholder="NOME"
                onChange={handleChange}
              />            
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>E-MAIL</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="email"
                value={userData.email}
                placeholder="E-MAIL"
                onChange={handleChange}
              />            
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>          
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="telefone"
                value={userData.telefone}
                placeholder="(99)99999-9999"
                onChange={handleChange}
              />            
            </Form.Group>
          </Col>
          <Col>          
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                name="senha"
                value={userData.senha}
                placeholder="SENHA"
                onChange={handleChange}
              />            
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Salvar</Button>
      </Form>
    </div>
  );
}

export default UserForm;