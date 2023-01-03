import React, { useEffect, useState } from "react";
import CountryCard from "../comps/CountryCard";

export default function IndexPage() {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");
  const [tmpCountries, setTmpCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [region, setRegion] = useState("");
  const [lightMode, setLightMode] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("countries")) {
      const tmpArr = JSON.parse(localStorage.getItem("countries"));
      setTmpCountries(JSON.parse(localStorage.getItem("countries")));
      const eightArr = [];

      for (let index = 0; index < 8; index++) {
        eightArr.push(tmpArr[index]);
      }
      console.log("eight: ", eightArr);
      setCountries(eightArr);
      console.log(
        "From local storage: ",
        JSON.parse(localStorage.getItem("countries"))
      );
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
            console.log("Fetch result: ", result);
            setCountries(result);
            localStorage.setItem("countries", JSON.stringify(result));
            console.log("countries after restating: ", countries);
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
    console.log("filtered data: ", filteredData);
    if (value.length === 0) {
      setIsSearching(false);
    }
  }, [filteredData]);

  const handleDarkMode = () => {
    if (lightMode) {
      setLightMode(false);
      document.documentElement.style.setProperty(
        "--comp-background",
        "#2B3844"
      );
      document.documentElement.style.setProperty(
        "--main-background",
        "#202C36"
      );
      document.documentElement.style.setProperty("--text-color", "#111517");
    }
    if (!lightMode) {
      setLightMode(true);
      document.documentElement.style.setProperty(
        "--comp-background",
        "#FFFFFF"
      );
      document.documentElement.style.setProperty("--text-color", "#FFFFFF");
      document.documentElement.style.setProperty(
        "--main-background",
        "#F2F2F2"
      );
    }
  };

  return (
    <div id="IndexContainer">
      <div id="Header">
        <div id="headerContainer">
          <p id="HeaderLeftParagraph">Where in the world?</p>
          <div onClick={handleDarkMode} id="HeaderSiteMode">
            {" "}
            <img
              id="MoonIcon"
              src={process.env.PUBLIC_URL + "Path.svg"}
              alt="moon"
            ></img>{" "}
            <p id="ModeBtn">Dark Mode</p>
          </div>
        </div>
      </div>
      <div id="SearchWrapper">
        <div id="SearchBox">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for a country..."
            onChange={handleOnChange}
          ></input>
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
                <CountryCard country={country} key={ind}></CountryCard>
              ))
            : filteredData.map((country, ind) => (
                <CountryCard country={country} key={ind}></CountryCard>
              ))}
        </div>
      </div>
    </div>
  );
}
