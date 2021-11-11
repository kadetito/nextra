import React from "react";
import ReactPlayer from "react-player/lazy";

export default function TabsArticulo(props) {
  const { articulo } = props;
  const { video } = articulo;

  return (
    <div>
      <ReactPlayer url={video} />
    </div>
  );
}
