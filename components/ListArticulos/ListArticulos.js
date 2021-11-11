import React from "react";
import { map, size } from "lodash";
import Link from "next/link";

export default function ListArticulos(props) {
  const { ropa } = props;
  return (
    <div className="articulos___global">
      <div className="row">
        {map(ropa, (articulo) => (
          <Articulo key={articulo.id} articulo={articulo} />
        ))}
      </div>
    </div>
  );
}

function Articulo(props) {
  const { articulo } = props;
  console.log(articulo);
  return (
    <div className="col-md-3 ">
      <Link href={`/${articulo.url}`}>
        <a>
          <div className="card p-3 mb-4">
            <div className="titulo">
              <h3>{articulo.title}</h3>
            </div>
            <div className="poster">
              <img
                className="img-fluid img-thumbnail"
                src={articulo.poster.url}
                alt={articulo.title}
              />
            </div>
            <div className="info">
              <p className="summary">{articulo.summary}</p>
              <div className="precios d-flex justify-content-between">
                <div>{articulo.price}€</div>
                <div>
                  {articulo.discount ? (
                    <span className="discount">-{articulo.discount}%</span>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
