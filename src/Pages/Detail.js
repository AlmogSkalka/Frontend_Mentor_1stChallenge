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
      <div id="CountryDetailsWrapper">
        <p id="CountryNameP"> {country.name.common}</p>
        <p className="CountryDetailsP">
          <b>Population:</b> {country.population}
          <br />
          <b>Region:</b> {country.region}
          <br />
          <b>Capital:</b> {country.capital}{" "}
        </p>
        <div id="BorderCountries">
          <p className="CountryDetailsP">
            <b>Border Countries:</b>{" "}
          </p>
          <div id="borderingTagsCountries">
            {country.borders
              ? country.borders.map((borderCountry, ind) => (
                  <div key={ind} className="borderParagraphs">
                    {" "}
                    {borderCountry}
                  </div>
                ))
              : "No border countries baby"}
          </div>
        </div>
      </div>
    </div>
  );
}
