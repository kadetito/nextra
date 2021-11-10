import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateAccountAPI } from "../../../api/user";

export default function ChangeAccountForm(props) {
  const [loading, setLoading] = useState(false);

  const { user, logout, setReloadUser } = props;

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      const response = await updateAccountAPI(user.id, formData, logout);
      if (!response) {
        toast.error("Error actualizando datos");
      } else {
        setReloadUser(true);
        toast.success("Datos actualizados");
      }

      setLoading(false);
    },
  });

  return (
    <>
      <div className="row  formularios___global">
        <div className="col-md-4">foto</div>
        <div className="col-md-8">
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Escriba el nombre"
                />
                <Form.Text className="text-error">
                  {formik.errors.name}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.lastname}
                  placeholder="Escriba el apellido"
                />
                <Form.Text className="text-error">
                  {formik.errors.lastname}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Button size="lg" variant="primary" type="submit">
                Modificar usuario
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

function initialValues(name, lastname, username, email) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(),
    lastname: Yup.string().required(),
  };
}
