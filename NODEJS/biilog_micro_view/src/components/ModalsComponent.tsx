/**
 * Mante as janelas modais da aplicação BOOTSTRAP 4
 * @todo: utilizar o parâmetro animation={false} para o MODAL motivo (Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode.)
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { confirmModal, destroyModals } from "../redux/modalSlice";
import {
  IConfirmModal,
  IFailModal,
  ILoadingModal,
  ISuccessModal,
} from "../interfaces/ModalsInterface";

/**
 * Modal com o opção de confirmação.
 * Utiliza como parâmetros o redux/modalSlice -> modal/confirmModal
 */
export const ModalConfirm: React.FC = () => {
  const dispatch = useDispatch();
  const modalState: IConfirmModal = useSelector(
    (state: any) => state.modals.confirm
  );
  const handleModalClose = () => {
    dispatch(destroyModals("confirm"));
  };
  const handleModalExecute = () => {
    let count = (modalState.executed || 0) + 1;
    dispatch(
      confirmModal({
        show: true,
        executed: count,
      })
    );
  };
  const onModalHide = () => {
    return;
  };
  // console.log(modalState);
  return (
    <Modal show={modalState.show} onHide={onModalHide} animation={false}>
      {modalState.textTitle && (
        <Modal.Header>
          <Modal.Title>{modalState.textTitle}</Modal.Title>
        </Modal.Header>
      )}
      {modalState.textBody && (
        <Modal.Body>
          {modalState.textBody}
          <Spinner
            animation="grow"
            role="status"
            variant="warning"
            size="sm"
            hidden={!modalState.disabledButtons}
          />
        </Modal.Body>
      )}
      {modalState.errorExecute && (
        <Modal.Body>
          <Alert variant="danger">{modalState.errorExecute}</Alert>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleModalClose}
          disabled={modalState.disabledButtons}
        >
          {"Fechar"}
        </Button>
        <Button
          variant={modalState.variantAction}
          disabled={modalState.disabledButtons}
          onClick={handleModalExecute}
        >
          {modalState.textAction}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * Modal que exibe loading da página.
 * Utiliza como parâmetros o redux/modalSlice -> modal/loadingModal
 */
export const ModalLoading: React.FC = () => {
  const modalState: ILoadingModal = useSelector(
    (state: any) => state.modals.loading
  );
  function onModalHide() {
    return;
  }
  return (
    <Modal
      show={modalState.show}
      onHide={onModalHide}
      animation={false}
      size="lg"
      centered={true}
    >
      <div className="d-flex justify-content-center">
        <Spinner
          animation="border"
          role="status"
          variant="info"
          className="m-5"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="sr-only">Loading....</span>
        </Spinner>
      </div>
      <Alert variant="info">{modalState.message}</Alert>
    </Modal>
  );
};

/**
 * Modal de falha
 * Utiliza como parâmetros o redux/modalSlice -> modal/failModal
 */
export const ModalFail: React.FC = () => {
  const dispatch = useDispatch();
  const modalState: IFailModal = useSelector((state: any) => state.modals.fail);
  const history = useHistory();
  function handleModalClose() {
    if (modalState.redirect === null) {
      history.goBack();
    } else {
      history.push(modalState.redirect);
    }
    dispatch(destroyModals("fail"));
  }
  function onModalHide() {
    return;
  }
  return (
    <Modal
      show={modalState.show}
      onHide={onModalHide}
      animation={false}
      size="lg"
      centered={true}
    >
      <Modal.Body>
        <Alert variant="danger">{modalState.textFail}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          {modalState.textButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * Modal de sucesso
 * Utiliza como parâmetros o redux/modalSlice -> modal/successModal
 */
export const ModalSuccess: React.FC = () => {
  const dispatch = useDispatch();
  const modalState: ISuccessModal = useSelector(
    (state: any) => state.modals.success
  );
  const history = useHistory();
  function handleModalClose() {
    if (modalState.redirect === null) {
      history.goBack();
    } else {
      history.push(modalState.redirect);
    }
    dispatch(destroyModals("success"));
  }
  function onModalHide() {
    return;
  }
  return (
    <Modal
      show={modalState.show}
      animation={false}
      onHide={onModalHide}
      size="lg"
      centered={true}
    >
      <Modal.Body>
        <Alert variant="success">{modalState.textSuccess}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          {modalState.textButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
