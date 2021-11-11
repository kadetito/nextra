import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { Icon } from "semantic-ui-react";
import TabsArticulo from "../TabsArticulo";
import Carrusel from "../Carrusel";

export default function HeaderArticulo(props) {
  const { articulo } = props;

  console.log(articulo);
  return articulo ? (
    <div className="row">
      <div className="col-12 mt-5">
        <Info articulo={articulo} />
      </div>
    </div>
  ) : (
    <div>El producto ya no se encuentra disponible</div>
  );
}

function Info(props) {
  const { articulo } = props;
  const { title, poster, price, discount, summary } = articulo;

  return (
    <div className="row mt-5">
      <div className="col-7">
        <img
          src={poster.url}
          alt={title}
          className="img-fluid img-thumbnail p-5"
        />
      </div>
      <div className="col-5 text-start">
        <h2>{title}</h2>
        <div className="mt-3 d-flex justify-content-between">
          <div className="me-2">
            <Icon name="heart outline" link />
          </div>
          <div>
            <h3>{price}€</h3>
          </div>
          <div className="ms-auto">
            <h3>
              <span className="tachado">
                {price - Math.floor(price * discount) / 100}€
              </span>
              -<span className="percent">{discount}%</span>
            </h3>
          </div>
        </div>

        <div className="mt-5">
          <div>
            <p dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
        </div>

        <div className="mt-5 d-flex justify-content-between">
          <div>
            <button className="btn btn-primary btn-lg">Comprar</button>
          </div>
        </div>

        <div className="mt-5 ">
          <div>
            <h4>Imágenes del artículo</h4>
            <Carrusel
              title={articulo.title}
              screenshots={articulo.screenshots}
              className="carrusel__global"
            />
          </div>
        </div>

        <div className="mt-5 articulo__video">
          <div>
            <TabsArticulo articulo={articulo} />
          </div>
        </div>
      </div>
    </div>
  );
}
