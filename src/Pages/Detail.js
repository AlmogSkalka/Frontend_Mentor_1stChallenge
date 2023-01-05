import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Detail() {
  const { state } = useLocation();
  const nav = useNavigate();
  const country = { state }.state;
  const NavBack = () => {
    nav("/");
  };

  console.log("country: ", country);
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
        id="DetailImage"
        src={country.flags.svg}
        alt={country.name.official + " flag goes here"}
      />
      {country.name.common}
      Population: {country.population}
      <br />
      Region: {country.region}
      <br />
      Capital: {country.capital}{" "}
    </div>
  );
}
