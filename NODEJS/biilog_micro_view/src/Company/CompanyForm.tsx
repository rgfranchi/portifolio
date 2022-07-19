/**
 * Formulário para operação de criar e atualizar Entidade.
 */
import React from "react";
import MaskedInput from "react-text-mask";
import { Formik } from "formik";
import * as Yup from "yup";

import { Form, Button, Col } from "react-bootstrap";

import { ICompany } from "./CompanyData";
import { CNPJMask } from "../helper/CNPJHelper";
import { IFormCreateUpdate } from "../interfaces/FormInterface";
import { CEPMask, findCEP } from "../helper/CEPHelper";
import { useDispatch } from "react-redux";
import { loadingModal } from "../redux/modalSlice";

import { CNPJSchema } from "../helper/CNPJHelper";
import { PhoneMask } from "../helper/PhoneHelper";

/**
 * Paramentos de validação da entidade.
 */
const validate = Yup.object({
  nome: Yup.string()
    .min(3, "Nome com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  nomeContato: Yup.string()
    .min(3, "Nome do contato com no mínimo 3 caracteres")
    .required("Preenchimento obrigatório"),
  cnpj: CNPJSchema,
  email: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("Preenchimento obrigatório"),
  telefone1: Yup.string().required("Preenchimento obrigatório"),
  codPostal: Yup.string().matches(
    /^(\d{5}-\d{3})/,
    "O CEP deve ser no formato de 99999-999"
  ),
});

/**
 * Entidade formulário de Empresas
 */
const CompanyForm: React.FC<IFormCreateUpdate<ICompany>> = ({
  initValues,
  submitForm,
}) => {
  let dispatch = useDispatch();

  /**
   * Localiza Endereço e preenche valores na tela.
   * @param values
   */
  const findCodPostal = async (values: ICompany) => {
    const codPostal = values.codPostal;
    if (codPostal.replace(/_/g, "").length === 9) {
      dispatch(loadingModal({ show: true, message: "Carregando CEP ... " }));
      await findCEP(codPostal)
        .then((resp) => {
          values.cidade = "";
          values.logradouro = "";
          values.bairro = "";
          if (typeof resp.response != "string") {
            values.pais = "Brasil";
            values.estado = resp.response.uf;
            values.cidade = resp.response.localidade;
            values.bairro = resp.response.bairro;
            values.logradouro = resp.response.logradouro;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(loadingModal({ show: false }));
        });
    }
  };

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={submitForm}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="ctrlNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formik.values.nome}
                placeholder="Nome da Empresa"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.nome && !!formik.errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nome}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="ctrlNomeContato">
              <Form.Label>Contato</Form.Label>
              <Form.Control
                type="text"
                name="nomeContato"
                value={formik.values.nomeContato}
                placeholder="Nome Responsável"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.nomeContato && !!formik.errors.nomeContato
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nomeContato}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="ctrlCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                as={MaskedInput}
                name="cnpj"
                value={formik.values.cnpj}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mask={CNPJMask}
                isInvalid={formik.touched.cnpj && !!formik.errors.cnpj}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cnpj}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="ctrlEMAIL">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                name="email"
                value={formik.values.email}
                placeholder="email@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="ctrlCodPostal">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                as={MaskedInput}
                type="text"
                name="codPostal"
                value={formik.values.codPostal}
                placeholder="00000-000"
                onChange={formik.handleChange}
                onBlur={async (event: any) => {
                  if (!formik.errors.codPostal) {
                    await findCodPostal(formik.values);
                  }
                  formik.handleBlur(event);
                }}
                isInvalid={
                  formik.touched.codPostal && !!formik.errors.codPostal
                }
                mask={CEPMask}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.codPostal}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="ctrlEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={formik.values.estado}
                placeholder="Estado"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="ctrlCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={formik.values.cidade}
                placeholder="Cidade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="ctrlBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={formik.values.bairro}
                placeholder="Bairro"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="ctrlPais">
              <Form.Label>Pais</Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={formik.values.pais}
                placeholder="Pais"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="8" controlId="ctrlLogradouro">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                type="text"
                name="logradouro"
                value={formik.values.logradouro}
                placeholder="Logradouro"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="ctrlNumero">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formik.values.numero}
                placeholder="Numero"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="ctrlComplemento">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                name="complemento"
                value={
                  formik.values.complemento == null
                    ? ""
                    : formik.values.complemento
                }
                placeholder="Complemento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="ctrlTelefone1">
              <Form.Label>Telefone Principal</Form.Label>
              <Form.Control
                as={MaskedInput}
                mask={PhoneMask}
                type="text"
                name="telefone1"
                value={formik.values.telefone1}
                placeholder="(99)9999-9999X"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.telefone1 && !!formik.errors.telefone1
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.telefone1}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="ctrlTelefone2">
              <Form.Label>Telefone Secundário</Form.Label>
              <Form.Control
                as={MaskedInput}
                mask={PhoneMask}
                type="text"
                name="telefone2"
                value={
                  formik.values.telefone2 == null ? "" : formik.values.telefone2
                }
                placeholder="(99)9999-9999X"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit" disabled={!formik.isValid}>
            Salvar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;
