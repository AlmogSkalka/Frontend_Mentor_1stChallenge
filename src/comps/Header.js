import React, { useState } from "react";

export default function Header() {
  const [lightMode, setLightMode] = useState(true);

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
      document.documentElement.style.setProperty("--text-color", "#FFFFFF");
    }
    if (!lightMode) {
      setLightMode(true);

      document.documentElement.style.setProperty(
        "--comp-background",
        "#FFFFFF"
      );

      document.documentElement.style.setProperty("--text-color", "#111517");

      document.documentElement.style.setProperty(
        "--main-background",
        "#F2F2F2"
      );
    }
  };

  return (
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
  );
}
