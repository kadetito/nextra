import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../auth";
import useAuth from "../../../hooks/useAuth";
import { getMeAPI } from "../../../api/user";
import { getCategoriasAPI } from "../../../api/categorias";
import { size, map } from "lodash";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export default function MenuWeb() {
  const [categorias, setCategorias] = useState([]);

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

  useEffect(() => {
    (async () => {
      const response = await getCategoriasAPI();
      setCategorias(response || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="menu__global">
        <div className="row">
          <div className="col-md-12 topnav__div ">
            <Navbar bg="light">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <MenuCollections categorias={categorias} />
                  </Nav>

                  {user !== undefined && (
                    <MenuUser
                      onShowModal={onShowModal}
                      user={user}
                      logout={logout}
                    />
                  )}
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </>
  );
}

function MenuCollections(props) {
  const { categorias } = props;
  return (
    <>
      {map(categorias, (categoria) => (
        <Nav.Link
          className="links"
          href={`/moda/${categoria.url}`}
          key={categoria.id}
        >
          {categoria.title}
        </Nav.Link>
      ))}
    </>
  );
}

function MenuUser(props) {
  const { onShowModal, user, logout } = props;

  const navDropdownTitle = <Icon name="user outline" />;
  return (
    <>
      <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
        {user ? (
          <>
            <NavDropdown.Item href="/orders">
              <a className="links">Mis pedidos</a>
            </NavDropdown.Item>

            <NavDropdown.Item href="/wishlist">
              <a className="links">
                <Icon title="perfil" name="heart" /> Mis favoritos
              </a>
            </NavDropdown.Item>

            <NavDropdown.Item href="/account">
              <a className="links">
                <Icon title="perfil" name="user" /> {user.name}
                {user.lastname}
              </a>
            </NavDropdown.Item>

            <NavDropdown.Item href="/cart">
              <a className="links">
                <Icon title="carrito" name="cart" />
              </a>
            </NavDropdown.Item>

            <NavDropdown.Item>
              <button className="links" onClick={logout}>
                <Icon title="logout" name="sign out" />
              </button>
            </NavDropdown.Item>
          </>
        ) : (
          <NavDropdown.Item>
            <button onClick={onShowModal} className="links">
              <Icon name="user outline" />
            </button>
          </NavDropdown.Item>
        )}
      </NavDropdown>
    </>
  );
}
