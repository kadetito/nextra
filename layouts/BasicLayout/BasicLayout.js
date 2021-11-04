import React from "react";
import Header from "../../components/Header";

export default function BasicLayout(props) {
  const { children } = props;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 m-0 p-0">
          <Header />

          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Basic alayout</h1>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
