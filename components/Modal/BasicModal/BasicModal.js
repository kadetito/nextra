import React from "react";

export default function BasicModal(props) {
  const { show, setShow, title, children, ...rest } = props;
  return (
    <div {...rest}>
      <h1>{children}</h1>
    </div>
  );
}
