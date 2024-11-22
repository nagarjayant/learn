import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "use-debounce";
import Dropdown from "./DropDown";
import UserTable from "./UserTable";
import InputElement from "./InputElement";
import ShopProgress from "./ShopProgress";
import "./App.css";

type User ={
  name: string;
  votes: number;
  join: Date;
}

function App() {
  const countryList: string[] = ["India", "USA", "UK"];
  const [country, setCountry] = useState<string>("");
  const langList: string[] = ["English", "German", "French"];
  const [language, setLanguage] = useState<string>("");
  const [userData, setUserData] = useState<User[]>([]);
  const [color, setColor] = useState<string | null>("grey");
  const [bgColor] = useDebounce(color, 500) as [string | null, unknown];
  const users = useMemo<User[]>(
    () => [
      {
        name: "John",
        votes: 3,
        join: new Date(2021, 4, 23),
      },
      {
        name: "James",
        votes: 5,
        join: new Date(2021, 4, 23),
      },
      {
        name: "Johnathan",
        votes: 15,
        join: new Date(2023, 4, 23),
      },
      {
        name: "Johnny",
        votes: 1,
        join: new Date(2022, 4, 23),
      },
    ],
    [],
  );

  useEffect(() => {
    setUserData(users);
  }, [users]);

  const changeCountry = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  }, []);

  const changeLanguage = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  }, []);

  const handleSort = useCallback(
    (sortBy: string) => {
      const sortedData = [...userData].sort((a, b) => {
        if (sortBy === "vote") {
          return b.votes - a.votes;
        } else {
          return b.join.getTime() - a.join.getTime();
        }
      });
      setUserData(sortedData);
    },
    [userData],
  );
  const changeColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredColor = e.target.value;
    const s = new Option().style;
    s.color = enteredColor;
    s.color === enteredColor || enteredColor.length != 0 ? setColor(enteredColor) : setColor("grey");
  }, []);

  return (
    <div className="center-container">
      <InputElement onChange={changeColor} />
      <br />
      <p>{bgColor}</p>
      <br />
      <Dropdown data={countryList} onChange={changeCountry} />
      <p>{country}</p>
      <Dropdown data={langList} onChange={changeLanguage} />
      <p>{language}</p>
      {userData.length > 0 && (
        <>
          <button onClick={() => handleSort("vote")} style={{ backgroundColor: bgColor || "grey" }}>
            Vote
          </button>
          <button onClick={() => handleSort("date")} style={{ backgroundColor: bgColor || "grey" }}>
            Date
          </button>
          <UserTable userdata={userData} />
        </>
      )}
      <ShopProgress />
    </div>
  );
}

export default App;
