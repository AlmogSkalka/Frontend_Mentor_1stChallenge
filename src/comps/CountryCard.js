import React from "react";
import Card from "react-bootstrap/Card";

export default function CountryCard({ country }) {
  return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          src={country.flags.svg}
          alt={country.name.official + " flag goes here"}
        />
        <Card.Body>
          <Card.Title>{country.name.official}</Card.Title>
          <Card.Text>
            <>
              Population: {country.population}
              <br />
              Region: {country.region}
              <br />
              Capital: {country.capital}
            </>{" "}
          </Card.Text>
        </Card.Body>
      </Card>
  );
}
