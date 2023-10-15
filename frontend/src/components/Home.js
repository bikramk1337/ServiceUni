import React from "react";
import { Link } from "react-router-dom";
import idimage from "./../img/idcard.jpg";
import parkingimage from "./../img/parking.jpg";
import roomimage from "./../img/room.jpg";

export default function Home() {
  return (
    <section className="mx-auto pb-5" style={{ width: 80 + "%" }}>
      <h1 className="mb-5 border-bottom pb-3 mb-5 w-50 text-center mx-auto border-secondary">
        Welcome to <span className="text-primary">ServiceUni</span>!
      </h1>
      <p>
        We are your one-stop destination for all your university needs. Whether
        you're looking to secure a convenient parking permit, borrow a textbook
        for your subject, or apply for your student ID card, we've got you
        covered. Have a look at our various services here
      </p>
      <div className="row">
        <div className="col-sm-4 mt-5">
          <div className="card">
            <img
              className="card-img-top"
              src={parkingimage}
              alt="Cars parking"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Parking Permit</h5>
              <p className="card-text">Apply for your parking permit today!</p>
              <Link to="/parking-permit" className="btn btn-primary">
                Apply
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mt-5">
          <div className="card">
            <img
              className="card-img-top"
              src={idimage}
              alt="Student holding id card"
            ></img>
            <div className="card-body">
              <h5 className="card-title">ID Card</h5>
              <p className="card-text">Get your student id card here</p>
              <Link to="/id-card" className="btn btn-primary">
                Apply
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mt-5">
          <div className="card">
            <img
              className="card-img-top"
              src={roomimage}
              alt="Students studying together"
            ></img>
            <div className="card-body">
              <h5 className="card-title">Uni Library</h5>
              <p className="card-text">Need a textbook? We got you covered</p>
              <a
                href="http://localhost:3001"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse books
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
