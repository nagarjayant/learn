import React, { useState, useEffect } from "react";
import { HeaderWrapper, TopBar } from "@ilc-technology/cefcom-react-header";
import axios from "axios";
import "./header.css";
function Header() {
  const [headerData, setheaderData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const csvUrl = `https://www.ef.com/central-api/gn/static/header/v2/get/${window.EFmarketCode}/ils/`; // Replace with your Google Sheets CSV file URL
    axios
      .get(csvUrl)
      .then((response) => {
        setheaderData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="headerSec">
      <HeaderWrapper data={headerData}>
        <TopBar data={headerData} />
      </HeaderWrapper>
    </div>
  );
}

export default Header;
