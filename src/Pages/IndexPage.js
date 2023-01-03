import React, { useEffect, useState } from "react";
import CountryCard from "../comps/CountryCard";
import Header from "../comps/Header";
export default function IndexPage() {
  const [value, setValue] = useState("");
  const [tmpCountries, setTmpCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (localStorage.getItem("countries")) {
      setTmpCountries(JSON.parse(localStorage.getItem("countries")));
    } else if (!localStorage.getItem("countries")) {
      fetch("https://restcountries.com/v3.1/all", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (result) => {
            localStorage.setItem("countries", JSON.stringify(result));
          },
          (error) => {
            console.log("fetch error: ", error);
          }
        );
    }
  }, []);

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleSelect = (event) => {
    setRegion(event.target.value);
  };

  const filteredCountries = tmpCountries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase()) &&
      country.region.toLowerCase().includes(region.toLocaleLowerCase())
  );

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        setFilteredData(
          tmpCountries.filter((item) => {
            return Object.values(item)
              .join("")
              .toLowerCase()
              .includes(value.toLowerCase());
          })
        ),
      1000
    );
    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    setIsSearching(true);
    if (value.length === 0) {
      setIsSearching(false);
    }
  }, [filteredData]);

  const ClickOnCard = (country) => {
    console.log("CLICK ON CARD", country);
  };
  return (
    <div id="IndexContainer">
      <Header />
      <div id="SearchWrapper">
        <div id="SearchBox">
          <input
            type="search"
            id="searchInput"
            placeholder="Search for a country..."
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div id="selectDiv">
        <select value={region} onChange={handleSelect}>
          <option value="default" defaultValue="Filter by Region">
            Filter by Region
          </option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="cardsRow">
        <div className="cardsCol">
          {!isSearching
            ? filteredCountries.map((country, ind) => (
                <div key={ind} onClick={() => ClickOnCard(country)}>
                  <CountryCard country={country} key={ind} />
                </div>
              ))
            : filteredData.map((country, ind) => (
                <div key={ind} onClick={() => ClickOnCard(country)}>
                  <CountryCard country={country} key={ind} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
