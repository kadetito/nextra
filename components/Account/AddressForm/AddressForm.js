import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { createAddressAPI, editAddressAPI } from "../../../api/address";

export default function AddressForm(props) {
  const { setshowModal, setReloadAddresses, newAddress, address } = props;

  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const {} = createAddres;
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);

    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };

    const response = await createAddressAPI(formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la dirección");
      setLoading(false);
    } else {
      setReloadAddresses(true);
      formik.resetForm();
      toast.success("Dirección creada");
      setLoading(false);
      setshowModal(false);
    }
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await editAddressAPI(address._id, formDataTemp, logout);
    if (!response) {
      toast.warning("Error al actualizar la dirección");
      setLoading(false);
    } else {
      setReloadAddresses(true);
      formik.resetForm();
      toast.success("Dirección actualizada");
      setLoading(false);
      setshowModal(false);
    }
  };

  return (
    <div className="row  formularios___global">
      <div className="col-12 formularios__address">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="title">
            <Row>
              <Col>
                <Form.Label>Título de la dirección</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholer="Título de la dirección"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                <Form.Text className="text-error">
                  {formik.errors.title}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Nombre y apellidos</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholer="Nombre y apellidos"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <Form.Text className="text-error">
                  {formik.errors.name}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholer="Dirección"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <Form.Text className="text-error">
                  {formik.errors.address}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholer="Teléfono"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <Form.Text className="text-error">
                  {formik.errors.phone}
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="city">
            <Row>
              <Col>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  placeholer="Ciudad"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
                <Form.Text className="text-error">
                  {formik.errors.city}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  name="state"
                  type="text"
                  placeholer="Estado/Provincia/Región"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
                <Form.Text className="text-error">
                  {formik.errors.state}
                </Form.Text>
              </Col>
              <Col>
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  name="postalcode"
                  type="text"
                  placeholer="Código postal"
                  onChange={formik.handleChange}
                  value={formik.values.postalcode}
                />
                <Form.Text className="text-error">
                  {formik.errors.postalcode}
                </Form.Text>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="phone">
            <Row>
              <Col></Col>
            </Row>
          </Form.Group>
          <div className="mt-5 mb-4 d-flex align-items-center justify-content-center">
            <Button type="submit" size="lg">
              {newAddress ? "Crear nueva dirección" : "Actualizar dirección"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalcode: address?.postalcode || "",
    phone: address?.phone || "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required("El título es obligatorio"),
    name: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    city: Yup.string().required("La ciudad es obligatoria"),
    state: Yup.string().required("La provincia es obligatoria"),
    postalcode: Yup.string().required("El código postal es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
  };
}
