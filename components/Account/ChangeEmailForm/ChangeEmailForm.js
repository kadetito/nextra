import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailAPI } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const [loading, setLoading] = useState(false);

  const { user, logout, setReloadUser } = props;

  const formik = useFormik({
    initialValues: initialValues(user.email, undefined),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await updateEmailAPI(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        toast.error("Error actualizando E-mail");
      } else {
        setReloadUser(true);
        toast.success("E-mail actualizado");
      }

      setLoading(false);
    },
  });

  return (
    <>
      <div className="row  formularios___global">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <p className="mt-5">Cambiar el e-mail actual ({user.email})</p>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Escriba un email"
                />
                <Form.Text className="text-error">
                  {formik.errors.email}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="repeatEmail">
                <Form.Label>Confirma tu Email</Form.Label>
                <Form.Control
                  name="repeatEmail"
                  value={formik.values.repeatEmail}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Escriba un email"
                />
                <Form.Text className="text-error">
                  {formik.errors.repeatEmail}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Button size="lg" variant="primary" type="submit">
                Modificar E-mail
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

function initialValues(email, repeatEmail) {
  return {
    email: email,
    repeatEmail: repeatEmail,
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required()
      .oneOf(
        [Yup.ref("repeatEmail")],
        "El e-mail debe ser el mismo en ambas casillas"
      ),
    repeatEmail: Yup.string()
      .email()
      .required()
      .oneOf(
        [Yup.ref("email")],
        "El e-mail debe ser el mismo en ambas casillas"
      ),
  };
}
