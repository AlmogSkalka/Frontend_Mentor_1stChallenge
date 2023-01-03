import React from "react";
import Header from "../comps/Header";
import { useLocation } from "react-router-dom";
export default function Detail() {
  const { state } = useLocation();
  const country = { state }.state;
  console.log("country: ", country);

  return (
    <div id="DetailContainer">
      <Header />
      <div id="BackWrapper">
        <div id="BackBTN">
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
