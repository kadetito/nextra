import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { registerAPI } from "../../../api/user";
import { toast } from "react-toastify";

export default function Registro(props) {
  const { showLoginForm } = props;
  const [loadingo, setLoadingo] = useState(false);

  const formik = useFormik({
    initialValues: functionInitialvalues(),

    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      //setLoadingo(true);
      const response = await registerAPI(formData);
      if (response?.jwt) {
        toast.success("Usuario registrado");
        showLoginForm();
      } else {
        toast.error("Error registrando el usuario");
      }
      //setLoadingo(false);
    },
  });

  return (
    <div className="row m-5 formularios___global">
      <div className="col-12 ">
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                onChange={formik.handleChange}
                type="text"
                placeholder="Escriba el nombre"
              />
              <Form.Text className="text-error">{formik.errors.name}</Form.Text>
            </Form.Group>

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
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={formik.handleChange}
                type="text"
                placeholder="Escriba un email email"
                error={formik.errors.email}
              />
              <Form.Text className="text-error">
                {formik.errors.email}
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
            </Form.Group>
          </div>
          <div className="d-flex justify-content-center">
            <Button size="lg" variant="primary" type="submit">
              Registrar usuario
            </Button>
          </div>
        </Form>
        <div className="mt-3 d-flex justify-content-center">
          <button type="button" className="ms-1 links" onClick={showLoginForm}>
            Ir al login
          </button>
        </div>
      </div>
    </div>
  );
}

function functionInitialvalues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    terminos: false,
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    username: Yup.string()
      .min(5, "El nombre de usuario debe contener un mínimo de 5 carácteres")
      .required("El usuario es obligatorio"),
    email: Yup.string()
      .email()
      .required("El email es obligatorio y debe ser válido"),
    password: Yup.string()
      .min(8, "El password debe tener un mínimo de 8 carácteres")
      .matches(/[a-zA-Z]/, "El password debe contener letras")
      .required("El password es obligatorio"),

    terminos: Yup.boolean().oneOf([true], "Debe aceptar los términos"),
  };
}
