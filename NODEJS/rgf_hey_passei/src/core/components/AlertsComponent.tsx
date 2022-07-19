/**
 * Mante as informações de Alert na aplicação BOOTSTRAP 4
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { listAlert } from "../redux/slice/alertSlice";
import { parseAnyToArrayString } from "../helper/ParsesHelper";
import { StringArrayToList } from "./FormsComponent";

/**
 * Exibe componente de alert em lista.
 * Realiza conversão da variável enviada em lista @link ../helper/ParsesHelper.
 * Utiliza como parâmetros o redux/alertSlice -> alert/listAlert
 */
export const AlertList: React.FC = () => {
  const dispatch = useDispatch();
  const alertState: any = useSelector((state: any) => state.alert);
  const handleAlertClose = () => {
    dispatch(
      listAlert({
        hidden: true,
        message: null,
      })
    );
  };
  let arrayMessage: string[] = parseAnyToArrayString(alertState.message);
  return (
    <Alert
      variant={alertState.variant}
      onClose={handleAlertClose}
      dismissible={true}
      hidden={alertState.hidden}
    >
      <StringArrayToList stringArray={arrayMessage} />
    </Alert>
  );
};
