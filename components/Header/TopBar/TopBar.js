import React from "react";
import Link from "next/link";
import { Input } from "semantic-ui-react";

export default function TopBar() {
  return (
    <div className="topbar__global">
      <div className="row">
        <div className="col-md-4 logotipo__div">
          <Logo />
        </div>
        <div className="col-md-8 menutopnav__div mt-1">
          <div>
            <Search />
          </div>
          <div className="ms-3">
            <h5>Search</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <img
          className="topbar__logotipo"
          src="/logos/paul-mitchell.svg"
          alt="Ropa y Textil"
        />
      </a>
    </Link>
  );
}

function Search() {
  return (
    <>
      <Input id="search-input" icon={{ name: "search" }} />
    </>
  );
}
