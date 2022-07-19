import { FormikHelpers } from "formik";
export interface IFormCreateUpdate<entity> {
  initValues: entity;
  submitForm(values: entity, { setSubmitting }: FormikHelpers<entity>): void;
  loadValues?: any;
}
