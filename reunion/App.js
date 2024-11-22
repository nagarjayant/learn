import React, { useState, useEffect } from "react";
import TransContext from "./utils/TransContext";
import { parseObject } from "./utils/TransContext";
import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Header from "./components/Header/Header";
import FooterSec from "./components/Footer/FooterSec";
import HeroSection from "./components/HeroSection/HeroSection";
import Details from "./components/Details/Details";
import Share from "./components/Share/Share";
import Sponsor from "./components/Sponsor/Sponsor";
import Events from "./components/Events/Events";
import Party from "./components/Party/Party";
import axios from "axios";
import { Helmet } from "react-helmet";
import shareImage from "./assets/shareImage.jpg";

function App() {
  let sheetID = "10i0e3akBMAur5Mtk8ZJVGIkIJcXRNshMN2-PS8yxFYA";
  let sheetName = "Translation";
  const [webData, setwebData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSponsor, setSponsor] = useState(false);
  const [metaTitle, setmetaTitle] = useState("");
  const [metaDesc, setmetaDesc] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const transURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&headers=1&sheet=${sheetName}`; // Replace with your Google Sheets CSV file URL
      try {
        const response = await axios.get(transURL);
        const dataText = response.data;
        const dataJSON = JSON.parse(dataText.match(/(?<=.*\().*(?=\);)/s));
        const transData = parseObject(dataJSON);
        setwebData(transData);
        setLoading(false);
        setmetaTitle(transData[7][window.EFmarketCode] ? transData[7][window.EFmarketCode] : transData[7]["we"]);
        setmetaDesc(transData[8][window.EFmarketCode] ? transData[8][window.EFmarketCode] : transData[8]["we"]);
        if (transData[20][window.EFmarketCode].length > 0) {
          setSponsor(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const urlWindow = window.location.search;
    if (urlWindow === "?translationDoc") {
      window.location.href = `https://docs.google.com/spreadsheets/d/${sheetID}/edit?usp=sharing`;
    }
  }, []);

  return (
    <>
      {metaTitle && (
        <Helmet>
          {/* Facebook tags */}
          <meta property="fb:app_id" content="295874639251961" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.ef.com/hub/24/reunion-party/" />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:site_name" content="EF Education First" />
          {/* Twitter tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@ef" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:creator" content="@ef" />
          <meta name="twitter:image" content={shareImage} />
          {/* Google tags */}
          <meta itemprop="name" content={metaTitle} />
          <meta itemprop="description" content={metaDesc} />
          <meta itemprop="image" content={shareImage} />
        </Helmet>
      )}
      {loading && <Overlay />}
      {!loading && <Header />}
      <TransContext.Provider value={webData}>
        {!loading && (
          <>
            <HeroSection />

            <Details />
            <Share />
            {isSponsor && <Sponsor />}
            <Events />
            <Party />
          </>
        )}
      </TransContext.Provider>
      {!loading && <FooterSec />}
    </>
  );
}

export default App;
