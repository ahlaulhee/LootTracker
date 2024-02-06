import { useEffect, useState } from "react";
import "./App.css";
import { Character } from "./vite-env";
import axios from "axios";
import classData from "../rotmgClasses.json";
import { Link } from "react-router-dom";

function App() {
  const [userCharacters, setUserCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    const characters = await axios.get(`http://localhost:3000/character`);
    setUserCharacters(characters.data);
  };
  useEffect(() => {
    fetchCharacters();
  }, []);
  return (
    <>
      <h1 className="text-center text-xl font-bold">Your Characters</h1>
      <div className="flex flex-wrap gap-2 p-2 justify-center">
        {userCharacters.map((char) => (
          <Link to={`/${char.id}`} id={char.id.toString()}>
            <div className="border-2 border-white p-4 rounded">
              <p className="text-lg font-semibold text-center">{char.name}</p>
              <img
                src={
                  classData.find((cl) => cl.className === char.class)
                    ?.classImage
                }
                alt={char.class}
              />
              <p className="font-bold text-center">
                Obtained:{" "}
                {char.items.filter((item) => item.obtained === true).length}/
                {char.items.length} (
                {(
                  (char?.items?.filter((item) => item.obtained === true)
                    .length /
                    char?.items?.length) *
                  100
                ).toFixed(2)}
                %)
              </p>
            </div>
          </Link>
        ))}
        <Link
          to={"/create"}
          className="w-[14rem] bg-green-400 hover:bg-green-700 text-black font-bold p-2 rounded duration-200 text-center text-[9rem]"
        >
          +
        </Link>
      </div>
    </>
  );
}

export default App;
