import React, { useState, useEffect } from "react";
import { Footer } from "@ilc-technology/cefcom-react-footer";
import axios from "axios";
import "./footer.css";

function FooterSec() {
  const [footerData, setfooterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const footerCon = await axios.get(`https://www.ef.com/central-api/gn/footer/v2/get/${window.EFmarketCode}/campaigns/`);
        const changeCountry = await axios.get(`https://www.ef.com/central-api/gn/static/changecountry/v2/get/${window.EFmarketCode}/contact/`);
        const merged = { ...footerCon.data, changeCountryLinks: changeCountry.data };
        setfooterData(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="footerSec">
      <Footer data={footerData} />
    </div>
  );
}

export default FooterSec;
