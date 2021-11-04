import React from "react";
import { Menu, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";

export default function MenuWeb() {
  return (
    <>
      <div className="menu__global">
        <div className="row">
          <div className="col-md-12 topnav__div ">
            <MenuCollections />
            <MenuUser />
          </div>
        </div>
      </div>
      <BasicModal>contenido modal basica</BasicModal>
    </>
  );
}

function MenuCollections() {
  return (
    <>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
      <Link href="/">
        <a className="links">Pñlaystation</a>
      </Link>
    </>
  );
}

function MenuUser() {
  return (
    <>
      <Link href="/">
        <a className="links">
          <Icon name="user outline" />
        </a>
      </Link>
    </>
  );
}
