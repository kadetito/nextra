import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function registerAPI(formData) {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function loginAPI(formData) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordAPI(email) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getMeAPI(logout) {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateAccountAPI(idUser, data, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateEmailAPI(idUser, email, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updatePasswordAPI(idUser, password, logout) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
