import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import {
  getItemsColeccionAPI,
  getTotalItemsCategory,
} from "../../api/articulo";
import { size } from "lodash";
import ListArticulos from "../../components/ListArticulos";
import { Loader } from "semantic-ui-react";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";

const limitPerPage = 4;

export default function Categoria() {
  const { query } = useRouter();

  const [ropas, setRopas] = useState(null);
  const [totalArticul, setTotalArticuls] = useState(null);

  //pagination
  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) {
      return 0;
    } else {
      return currentPage * limitPerPage - limitPerPage;
    }
  };

  useEffect(() => {
    (async () => {
      if (query.categoria) {
        const response = await getItemsColeccionAPI(
          query.categoria,
          limitPerPage,
          getStartItem()
        );
        setRopas(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalItemsCategory(query.categoria);
      setTotalArticuls(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="categorias__global">
      <h1>{query.categoria}</h1>

      {!ropas && <Loader active>Cargando...</Loader>}
      {ropas && size(ropas) === 0 && <div>No hay artículos</div>}
      {size(ropas) > 0 && <ListArticulos ropa={ropas} />}

      {totalArticul > limitPerPage ? (
        <Pagination
          totalArticul={totalArticul}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
