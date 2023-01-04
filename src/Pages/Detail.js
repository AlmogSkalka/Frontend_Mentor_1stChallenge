import React from "react";
import Header from "../comps/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function Detail() {
  const { state } = useLocation();
  const nav = useNavigate();
  const country = { state }.state;
  const NavBack = () => {
    nav("/");
  };
  return (
    <div id="DetailContainer">
      <div id="BackWrapper">
        <div id="BackBTN" onClick={NavBack}>
          <button>
            <img src={process.env.PUBLIC_URL + "Back.svg"} alt="backBTN" />
            Back
          </button>
        </div>
      </div>
      <img
        src={country.flags}
        alt={country.name.official + " flag goes here"}
      />
      {country.name.official}
      Population: {country.population}
      <br />
      Region: {country.region}
      <br />
      Capital: {country.capital}{" "}
    </div>
  );
}
