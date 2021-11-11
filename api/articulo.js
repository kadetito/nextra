import { BASE_PATH } from "../utils/constants";

export async function getLastArticuloAPI(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const url = `${BASE_PATH}/ropas?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getItemsColeccionAPI(categoria, limit, start) {
  try {
    const categorias = `_categoria.url=${categoria}`;
    const limitItems = `_limit=${limit}`;
    const sortItem = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/ropas?${categorias}&${limitItems}&${sortItem}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getTotalItemsCategory(categoria) {
  try {
    const url = `${BASE_PATH}/ropas/count?categoria.url=${categoria}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getItemByURL(path) {
  try {
    const url = `${BASE_PATH}/ropas?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    return null;
  }
}
