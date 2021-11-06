import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../auth";
import useAuth from "../../../hooks/useAuth";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const { logout } = useAuth;
  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="menu__global">
        <div className="row">
          <div className="col-md-12 topnav__div ">
            <MenuCollections />
            <button onClick={logout}> Cerrar sesión</button>
            <MenuUser onShowModal={onShowModal} />
          </div>
        </div>
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </>
  );
}

function MenuCollections() {
  return (
    <>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
    </>
  );
}

function MenuUser(props) {
  const { onShowModal } = props;
  return (
    <button onClick={onShowModal} className="links">
      <Icon name="user outline" />
    </button>
  );
}
