import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordAPI } from "../../../api/user";

export default function ChangePasswordForm(props) {
  const [loading, setLoading] = useState(false);

  const { user, logout } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await updatePasswordAPI(
        user.id,
        formData.password,
        logout
      );
      if (!response || response?.statusCode === 400) {
        toast.error("Error actualizando Password");
      } else {
        toast.success("Password actualizado");
        logout();
      }

      setLoading(false);
    },
  });

  return (
    <>
      <div className="row  formularios___global">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <p className="mt-5">Cambiar contraseña</p>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  placeholder="Password"
                />
                <Form.Text className="text-error">
                  {formik.errors.password}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="repeatPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="repeatPassword"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.repeatPassword}
                  placeholder="Repite Password"
                />
                <Form.Text className="text-error">
                  {formik.errors.repeatPassword}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Button size="lg" variant="primary" type="submit">
                Modificar Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("repeatPassword")],
        "El password debe ser el mismo en ambas casillas"
      ),
    repeatPassword: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("password")],
        "El password debe ser el mismo en ambas casillas"
      ),
  };
}
