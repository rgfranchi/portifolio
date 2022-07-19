/**
 * Cria tela para seleção de operadores.
 */
import { FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { ButtonsPanel, IButtonList } from "../components/ButtonsComponent";
import { IModule } from "../Module/ModuleData";
import { IOperator } from "./OperatorData";

const OperatorPanelForm: React.FC<{
  formik: FormikProps<{ module: IModule }> | any;
  loadOperators: IOperator[];
}> = ({ formik, loadOperators }) => {
  const [listButtons, setListButtons] = useState<IButtonList[]>([]);
  let listOperatorId = formik.values.module.listOperatorId;

  const operator_click = (events: any) => {
    const selectedId: number = parseInt(events.target.id);
    const index = listOperatorId.indexOf(selectedId);
    if (index === -1) {
      listOperatorId.push(parseInt(events.target.id));
    } else {
      listOperatorId.splice(index, 1);
    }
    loadInfo();
    formik.values.module.listOperatorId = listOperatorId;
  };

  const loadInfo = () => {
    let loadButtons: IButtonList[] = [];
    loadOperators.forEach((operator, index) => {
      loadButtons[index] = {
        id: operator.id,
        text: operator.nome,
        execute: operator_click,
        variant: listOperatorId.includes(parseInt(operator.id.toString()))
          ? "success"
          : "primary",
      };
    });
    setListButtons(loadButtons);
  };

  useEffect(() => {
    loadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(loadOperators);
  return listButtons.length === 0 ? (
    <>OPERADORES NÃO LOCALIZADOS</>
  ) : (
    <ButtonsPanel column={5} list={listButtons} />
  );
};

export default OperatorPanelForm;
