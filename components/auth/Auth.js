import React, { useState } from "react";
import Login from "./Login";
import Registro from "./Registro";

export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar sesión");
  };
  const showRegForm = () => {
    setShowLogin(false);
    setTitleModal("Registrar usuario");
  };

  return showLogin ? (
    <Login showRegForm={showRegForm} onCloseModal={onCloseModal} />
  ) : (
    <Registro showLoginForm={showLoginForm} />
  );
}
