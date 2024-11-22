import "./events.css";
import { useState, useEffect, useContext } from "react";
import TransContext from "../../utils/TransContext";
import { parseObject } from "../../utils/TransContext";
import axios from "axios";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}
function Events() {
  const jsonData = useContext(TransContext);
  const title = jsonData[11][window.EFmarketCode] ? jsonData[11][window.EFmarketCode] : jsonData[11]["we"];
  let sheetID = "10i0e3akBMAur5Mtk8ZJVGIkIJcXRNshMN2-PS8yxFYA";
  let eventSheet = `event-${window.EFmarketCode}`;
  const [EventData, setEventData] = useState({});
  const [EventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const eventURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&headers=1&sheet=${eventSheet}`; // Replace with your Google Sheets CSV file URL
      axios
        .get(eventURL)
        .then((response) => {
          const dataText = response.data;
          const jsonData = JSON.parse(dataText.match(/(?<=\().*(?=\);)/s)[0]);
          const checkEvent = parseObject(jsonData);
          if (checkEvent[0].eventid) {
            setEventData(parseObject(jsonData));
            setEventLoading(false);
          }
        })
        .catch((error) => {
          setEventLoading(true);
          console.error("Error fetching data:", error);
          console.log("Show error notification!");
          return Promise.reject(error);
        });
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function parseObject(data) {
    let cellData, propName, dataObject;
    const dataObjectsArray = [];
    const cols = data.table.cols;
    const rows = data.table.rows;
    const propNames = convertPropNames(cols);

    for (let i = 0; i < rows.length; i++) {
      dataObject = {};

      for (let j = 0; j < propNames.length; j++) {
        propName = propNames[j];
        cellData = rows[i]["c"][j];

        if (cellData === null) {
          dataObject[propName] = "";
        } else if (typeof cellData["v"] == "string" && cellData["v"].startsWith("Date")) {
          // dataObject[propName] = new Date(cellData["f"]);
          dataObject[propName] = cellData["f"];
        } else {
          dataObject[propName] = cellData["v"];
        }
      }

      dataObjectsArray.push(dataObject);
    }

    return dataObjectsArray;
  }

  function convertPropNames(props) {
    let propsArray = [];
    let prop, propPieces;

    for (let i = 0; i < props.length; i++) {
      prop = props[i].label;

      if (prop.includes(" ") || prop.includes("-")) {
        prop = props[i].label.toLowerCase();
        propPieces = prop.split(/[- ]+/);

        propPieces = propPieces.map((prop, i) => {
          return i > 0 ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop;
        });

        propsArray.push(propPieces.join(""));
      } else if (Boolean(prop.match(/\b([A-Z])/))) {
        propsArray.push(prop.toLowerCase());
      } else {
        propsArray.push(prop);
      }
    }

    return propsArray;
  }
  return (
    <section className="eventSection" id="eventSection">
      <div className="center-1200">
        {EventLoading ? (
          ""
        ) : (
          <>
            <h1>{title}</h1>
            <div className="eventArea">
              <Slider {...settings}>
                {EventData.map((data) => {
                  const eventId = data["eventid"];

                  return (
                    <div className="eventSlide" key={eventId} id={eventId}>
                      <div id={`eventbrite-widget-container-${eventId}`}>
                        <iframe src={`https://www.eventbrite.co.uk/checkout-external?eid=${eventId}&amp;parent=${window.location.href}`} data-automation={`checkout-widget-iframe-${eventId}`} allowtransparency frameBorder={"0"}></iframe>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Events;
