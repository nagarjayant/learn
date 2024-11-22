import "./styles.css";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState();
  const [cityDrop, setCityDrop] = useState();
  const [showCity, setShowCity] = useState(false);
  const data = [
    {
      name: "India",
      code: "IN",
      cities: ["Del", "Noi", "Ben"],
    },
    {
      name: "America",
      code: "USA",
      cities: ["NY", "LAS", "SAN"],
    },
    {
      name: "United Kingdom",
      code: "UK",
      cities: ["Lon", "Bri", "Sam"],
    },
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
    setCityDrop(e.target.selectedOptions[0].getAttribute("data-id"));
    setShowCity(true);
  };
  return (
    <div className="App">
      <select onChange={handleChange}>
        {data.map((item, index) => {
          return (
            <option value={item.code} data-id={index}>
              {item.name}
            </option>
          );
        })}
      </select>
      {showCity && (
        <>
          <select>
            {data[cityDrop].cities.map((item,) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </>
      )}
    </div>
  );
}
