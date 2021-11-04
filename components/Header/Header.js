import React from "react";
import MenuWeb from "./MenuWeb";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <div>
      <div className="row">
        <div className="col-12 m-0 p-0 header__global">
          <TopBar />
          <MenuWeb />
        </div>
      </div>
    </div>
  );
}
