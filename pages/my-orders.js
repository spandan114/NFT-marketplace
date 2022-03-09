import React from "react";
import CardComponent from "../components/Card";
import { basicAuth } from "../helpers/AuthHelper";

const MyOrders = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default basicAuth(MyOrders);
