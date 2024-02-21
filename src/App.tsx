import { useEffect, useState } from "react";
import "./App.css";
import { Character } from "./vite-env";
import axios from "axios";
import classData from "../rotmgClasses.json";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [userCharacters, setUserCharacters] = useState<Character[]>([]);

  const navigate = useNavigate();

  const fetchCharacters = async () => {
    const characters = await axios.get(`http://localhost:3000/character`);
    setUserCharacters(characters.data);
  };

  const deleteCharacter = async (id: number) => {
    await axios.delete(`http://localhost:3000/character/${id}`);
    fetchCharacters();
  };

  useEffect(() => {
    fetchCharacters();
  }, []);
  return (
    <>
      <h1 className="text-center text-xl font-bold">Your Characters</h1>
      <div className="flex flex-wrap gap-2 p-2 justify-center">
        {userCharacters.map((char) => (
          <div
            className="border-2 border-white p-4 rounded cursor-pointer"
            onClick={() => navigate(`/${char.id}`)}
          >
            <p className="text-lg font-semibold text-center">{char.name}</p>
            <img
              src={
                classData.find((cl) => cl.className === char.class)?.classImage
              }
              alt={char.class}
            />
            <p className="font-bold text-center">
              Obtained:{" "}
              {char.items.filter((item) => item.obtained === true).length}/
              {char.items.length} (
              {(
                (char?.items?.filter((item) => item.obtained === true).length /
                  char?.items?.length) *
                100
              ).toFixed(2)}
              %)
            </p>
            <button
              className="font-bold rounded bg-red-500 w-full mt-4"
              onClick={(e) => {
                e.stopPropagation();
                deleteCharacter(char.id);
              }}
            >
              X
            </button>
          </div>
        ))}
        <Link
          to={"/create"}
          className="w-[14rem] h-[20rem] bg-green-400 hover:bg-green-700 text-black font-bold rounded duration-200 text-center text-[10.5rem]"
        >
          +
        </Link>
      </div>
    </>
  );
}

export default App;
