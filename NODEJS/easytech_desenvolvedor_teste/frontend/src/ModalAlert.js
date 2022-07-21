import { Button, Modal } from "react-bootstrap";

const ModalAlert = ({message, setMessage }) => {
  const handleExit = async (event) => {
    setMessage("");
  }
  return (
    <Modal
      show={message !== ""}
      animation={false}
      size="lg"
      centered={true}
    >
      <Modal.Body>
        <h1>{message}</h1>
      </Modal.Body>
      <Modal.Footer>
      <Button
          onClick={() => handleExit()}
        >Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAlert;