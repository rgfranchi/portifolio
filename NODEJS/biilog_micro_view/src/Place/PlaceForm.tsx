import React from "react";
import { FormikProps } from "formik";
import { Col, Form } from "react-bootstrap";

import { IPlace } from "./PlaceData";

export const PlaceFormFields: React.FC<{
  formik: FormikProps<{ transmission: IPlace }> | any;
}> = ({ formik }) => {
  return <>TESTE PLACE: MAPA COM LOCALIZAÇÃO</>;
};
