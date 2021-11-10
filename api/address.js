import { BASE_PATH } from "../utils/constants";

import { authFetch } from "../utils/fetch";

export async function createAddressAPI(address, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },

      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}

export async function getAddressAPI(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);

    if (result.statusCode === 500) throw "Error del servidor";
    return result;
  } catch (error) {
    return null;
  }
}

export async function deleteAddressAPI(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      heders: {
        "Content-Type": "Application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    return null;
  }
}

export async function editAddressAPI(idAddress, address, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },

      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    return null;
  }
}
