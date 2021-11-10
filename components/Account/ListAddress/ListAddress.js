import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import { getAddressAPI, deleteAddressAPI } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressAPI(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) {
    return null; //colocar un spinner
  }

  return (
    <div className="row addresses__global">
      <div className="col-12">
        {size(addresses) === 0 ? (
          <h3>No hay ninguna dirección creada</h3>
        ) : (
          <div className="row ">
            {map(addresses, (address) => (
              <div key={address.id} className="col-md-3">
                <Address
                  address={address}
                  logout={logout}
                  setReloadAddresses={setReloadAddresses}
                  openModal={openModal}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Address(props) {
  const { address, logout, setReloadAddresses, openModal } = props;

  const deleteAddress = async () => {
    const response = await deleteAddressAPI(address.id, logout);
    if (response) {
      setReloadAddresses(true);
    }
  };

  return (
    <div className=" card  p-4 text-start mb-3">
      <h4>{address.title}</h4>
      <ul>
        <li>{address.name}</li>
        <li>
          {address.address} - {address.postalcode}
        </li>
        <li>
          {address.city} ({address.state})
        </li>
        <li>{address.phone}</li>
      </ul>
      <div className="d-flex align-items-end justify-content-between">
        <div>
          <button
            onClick={() => openModal(`Editar: ${address.title}`, address)}
          >
            Editar
          </button>
        </div>
        <div>
          <button onClick={deleteAddress}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
