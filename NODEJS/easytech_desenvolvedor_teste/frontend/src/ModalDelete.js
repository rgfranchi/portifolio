import { Button, Modal } from "react-bootstrap";
import { deleteById } from "./UserData";


const ModalDelete = ({deleteId, setDeleteId, setCountReloadList, countReloadList, setMessage }) => {
  const handleExit = async (event) => {
    setDeleteId(0);
  }
  const handleConfirm = async (deleteId) => {
    console.log(deleteId);
    await deleteById(deleteId);
    setCountReloadList(countReloadList + 1);
    setDeleteId(0);
    setMessage("Usuário excluído com sucesso");
  }

  return (
    <Modal
      show={deleteId !== 0}
      animation={false}
      size="lg"
      centered={true}
    >
      <Modal.Body>
        <h1>EXCLUIR REGISTRO !!!!!</h1>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="warning" onClick={() => handleConfirm(deleteId)}>Confirm</Button>
      <Button onClick={() => handleExit()}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
}

export default ModalDelete;