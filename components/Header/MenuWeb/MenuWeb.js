import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../auth";
import useAuth from "../../../hooks/useAuth";
import { getMeAPI } from "../../../api/user";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState(undefined);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="menu__global">
        <div className="row">
          <div className="col-md-12 topnav__div ">
            <MenuCollections />

            {user !== undefined && (
              <MenuUser onShowModal={onShowModal} user={user} logout={logout} />
            )}
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
  const { onShowModal, user, logout } = props;
  return (
    <>
      {user ? (
        <>
          <Link href="/orders">
            <a className="links">Mis pedidos</a>
          </Link>
          <Link href="/wishlist">
            <a className="links">
              <Icon title="perfil" name="heart" /> Mis favoritos
            </a>
          </Link>
          <Link href="/account">
            <a className="links">
              <Icon title="perfil" name="user" /> {user.name} {user.lastname}
            </a>
          </Link>

          <Link href="/cart">
            <a className="links">
              <Icon title="carrito" name="cart" />
            </a>
          </Link>

          <button className="links" onClick={logout}>
            <Icon title="logout" name="sign out" />
          </button>
        </>
      ) : (
        <button onClick={onShowModal} className="links">
          <Icon name="user outline" />
        </button>
      )}
    </>
  );
}
