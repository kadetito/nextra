import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getLastArticuloAPI } from "../api/articulo";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import ListArticulos from "../components/ListArticulos/ListArticulos";

export default function Home() {
  const [ropa, setRopa] = useState(null);
  console.log(ropa);
  useEffect(() => {
    (async () => {
      const response = await getLastArticuloAPI(50);
      if (size(response) > 0) {
        setRopa(response);
      } else {
        setRopa([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="home__global">
      <div className="row">
        <div className="col-12">
          <h1>Home</h1>
          {!ropa && <Loader active>cargando novedades...</Loader>}
          {ropa && size(ropa) === 0 && <h3>No hay novedades</h3>}
          {size(ropa) > 0 && (
            <>
              <h3>Estas son las novedades</h3>
              <ListArticulos ropa={ropa} />
            </>
          )}
        </div>
      </div>
    </BasicLayout>
  );
}
