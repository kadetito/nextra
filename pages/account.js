import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getMeAPI } from "../api/user";
import ChangeAccountForm from "../components/Account/ChangeAccountForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import { Icon } from "semantic-ui-react";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

export default function account() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account__global">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setReloadUser } = props;

  return (
    <div className="row">
      <div className="col-12 pt-5">
        <div className="card p-4">
          <h3>
            Perfil de usuario de {user.name} {user.lastname}
          </h3>
          <h5>Configuraciones</h5>
          <ChangeAccountForm
            user={user}
            logout={logout}
            setReloadUser={setReloadUser}
            className="account__form-profile"
          />

          <ChangeEmailForm
            user={user}
            logout={logout}
            setReloadUser={setReloadUser}
            className="account__form-profile"
          />

          <ChangePasswordForm
            user={user}
            logout={logout}
            className="account__form-profile"
          />
        </div>
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setshowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        address={address || null}
        newAddress={address ? false : true}
        setshowModal={setshowModal}
        setReloadAddresses={setReloadAddresses}
      />
    );
    setshowModal(true);
  };
  return (
    <>
      <div className="row mb-5  formularios___global">
        <div className="col-12">
          <div className="row">
            <div className="col-12 pt-5">
              <div className="card p-4 ">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3>Direcciones de entrega y facturación</h3>
                  </div>
                  <div>
                    <Icon
                      onClick={() => openModal("Nueva dirección")}
                      title="Nueva dirección"
                      name="plus"
                      link
                    />
                  </div>
                </div>
                <div className="row mt-5 mb-5">
                  <div className="col-12">
                    <ListAddress
                      reloadAddresses={reloadAddresses}
                      setReloadAddresses={setReloadAddresses}
                      openModal={openModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicModal show={showModal} setShow={setshowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </>
  );
}
