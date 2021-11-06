import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginAPI, resetPasswordAPI } from "../../../api/user";

export default function Login(props) {
  const { showRegForm, onCloseModal } = props;

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: functionInitialvalues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const response = await loginAPI(formData);
      if (response?.jwt) {
        login(response.jwt);
        toast.success("Usuario autenticado");
        onCloseModal();
      } else {
        toast.error("Imposible acceder.");
      }
    },
  });

  const resetPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required();
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      resetPasswordAPI(formik.values.identifier);
    }
  };

  return (
    <div className="row m-5 formularios___global">
      <div className="col-12 ">
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Group className="mb-3" controlId="identifier">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                name="identifier"
                onChange={formik.handleChange}
                type="text"
                placeholder="Escriba el e-mail"
              />
              <Form.Text className="text-error">
                {formik.errors.identifier}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={formik.handleChange}
                type="password"
                placeholder="Password"
              />
              <Form.Text className="text-error">
                {formik.errors.password}
              </Form.Text>
            </Form.Group>

            {/* 
            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Escriba el apellido"
                error={formik.errors.lastname}
              />
              <Form.Text className="text-error">
                {formik.errors.lastname}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                name="username"
                onChange={formik.handleChange}
                type="text"
                placeholder="Escriba el nombre de usuario"
                error={formik.errors.username}
              />
              <Form.Text className="text-error">
                {formik.errors.username}
              </Form.Text>
            </Form.Group> */}

            {/* 
            <Form.Group className="mb-3" controlId="terminos">
              <Form.Check
                type="checkbox"
                name="terminos"
                onChange={formik.handleChange}
                label="Aceptar los términos de privacidad"
                error={formik.errors.terminos}
              />
              <Form.Text className="text-error">
                {formik.errors.terminos}
              </Form.Text>
            </Form.Group> */}
          </div>
          <div className="d-flex justify-content-center">
            <Button size="lg" variant="primary" type="submit">
              Acceder
            </Button>
          </div>
        </Form>
        <div className="mt-3 d-flex justify-content-center">
          <button type="button" className="me-1 links" onClick={showRegForm}>
            Registrar usuario
          </button>
          <button
            type="button"
            onClick={resetPassword}
            className="ms-1 links"
            onClick={showRegForm}
          >
            Contraseña olvidada
          </button>
        </div>
      </div>
    </div>
  );
}

function functionInitialvalues() {
  return { identifier: "", password: "" };
}

function validationSchema() {
  return {
    identifier: Yup.string().email().required("Por favor, escriba su e-mail"),
    password: Yup.string().required("Debe informar del password!!"),
  };
}
