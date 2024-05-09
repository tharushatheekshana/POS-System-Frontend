import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Reports() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h3 className="card-title">
                <i class="bi bi-archive-fill"> PRODUCTS</i>
              </h3>
            </div>
            <h1 className="card-text">300</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h3 className="card-title">
                <i class="bi bi-grid-3x3-gap-fill">CATEGORIES</i>
              </h3>
            </div>
            <h1 className="card-text">12</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h3 className="card-title">
                <i class="bi bi-people-fill">CUSTOMERS</i>
              </h3>
            </div>
            <h1 className="card-text">33</h1>
          </div>
        </div>
        <div className="col">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h3 className="card-title">
                <i class="bi bi-bell-fill">ALERTS</i>
              </h3>
            </div>
            <h1 className="card-text">42</h1>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col"></div>
      </div>
    </div>
  );
}

export default Reports;
