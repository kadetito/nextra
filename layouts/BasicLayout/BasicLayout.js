import React from "react";
import Header from "../../components/Header";
import classNames from "classnames";

export default function BasicLayout(props) {
  const { children, className } = props;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 m-0 p-0">
          <Header />

          <div className="container">
            <div className="row">
              <div className={classNames("col-12", { [className]: className })}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
