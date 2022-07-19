/**
 * Contem funcionalidades para formulários da aplicação.
 */
import React from "react";
import { Form } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";

/**
 * name: nome do campo
 * value: valor string da data
 * dateFormat: formato de exibição da data e hora
 * format: formato de captura e resposta da data ex. yyyy-MM-dd hh:mm:ss
 * formikSetFieldValue:  declarar {..., setFieldValue, ... ,} e utilizar formikSetFieldValue={setFieldValue}.
 * isInvalid: marcar o campo como inválido
 * showTimeInput: exibe seleção de data se true.
 */
export interface IFormDatePicker {
  name: string;
  value: string;
  dateFormat: string;
  format: string;
  formikSetFieldValue(name: string, value: any): void;
  isInvalid?: boolean;
  showTimeInput?: boolean;
}
/**
 * Cria componente de seleção de data para Formik com o componente Form.Control
 * Utiliza DatePicker: https://github.com/Hacker0x01/react-datepicker
 * https://date-fns.org/
 * @param props Utiliza interface IControlDatePicker
 */
export const FormDatePicker: React.FC<IFormDatePicker> = (props) => {
  const change = (val: any) => {
    props.formikSetFieldValue(props.name, format(val, props.format));
  };
  let date = new Date();
  if (typeof props.value !== "undefined" && props.value) {
    const time: string = props.showTimeInput === true ? "" : "T00:00:00.000Z";
    date = new Date(props.value + time);
  }
  return (
    <Form.Control
      as={DatePicker}
      name={props.name}
      selected={date}
      dateFormat={props.dateFormat}
      onChange={change}
      isInvalid={props.isInvalid}
      showTimeInput={props.showTimeInput}
    />
  );
};

export interface IStringArrayToList {
  stringArray: string[];
}
/**
 * Exibe elementos em lista.
 * Converte Array de string em list (ul->li).
 * @param props IStringArrayToList
 */
export const StringArrayToList: React.FC<IStringArrayToList> = (props) => {
  return (
    <ul>
      {props.stringArray.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export interface IFormSelectValue {
  id: number;
  value: string;
}

interface IFormSelect {
  name: string;
  value: string;
  dataList: IFormSelectValue[];
  dataEmpty?: IFormSelectValue;
  onChange(): any;
  onBlur(): any;

  isInvalid: boolean | undefined;
}
/**
 * Preenche com valores das empresa disponíveis no sistema.
 * @param props IFormSelect
 */
export const FromSelect: React.FC<IFormSelect> = (props) => {
  return (
    <Form.Control
      as="select"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      isInvalid={props.isInvalid && false}
    >
      {props.dataEmpty && (
        <option value={props.dataEmpty.id}>{props.dataEmpty.value}</option>
      )}
      {props.dataList.map((item, index) => (
        <option
          key={index}
          value={item.id}
          // selected={props.value.toString() === item.id.toString()}
          defaultValue={props.value.toString()}
        >
          {item.value}
        </option>
      ))}
    </Form.Control>
  );
};
