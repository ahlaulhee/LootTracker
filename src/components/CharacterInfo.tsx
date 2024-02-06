import { useParams } from "react-router-dom";
import { Character } from "../vite-env";
import { useEffect, useState } from "react";
import axios from "axios";
import classData from "../../rotmgClasses.json";

function CharacterInfo() {
  const [character, setCharacter] = useState<Character>();
  const [searchInput, setSearchInput] = useState("");
  const { userId } = useParams();

  const updateItemStatus = async (id: number) => {
    if (!character || !userId) return;
    const userIndex = parseInt(userId) - 1;
    await axios.put(`http://localhost:3000/character/${userIndex}/items/${id}`);
    fetchCharacter();
  };

  const uncheckAllItems = async () => {
    if (!character || !userId) return;
    const userIndex = parseInt(userId) - 1;
    await axios.put(`http://localhost:3000/character/${userIndex}/uncheckAll`);
    fetchCharacter();
  };

  const fetchCharacter = async () => {
    if (!userId) return;
    const userIndex = parseInt(userId) - 1;
    const character = await axios.get(
      `http://localhost:3000/character/${userIndex}`
    );
    setCharacter(character.data);
  };

  useEffect(() => {
    fetchCharacter();
  }, [userId]);

  if (!character)
    return (
      <div className="text-center text-red-500 text-lg font-bold">
        Loading...
      </div>
    );

  return (
    <div className="p-2 space-y-2">
      <div className="flex">
        <img
          src={
            classData.find((cl) => cl.className === character?.class)
              ?.classImage
          }
          alt=""
        />
        <div className="flex flex-col justify-center w-full text-center text-2xl">
          <h1>
            Name:{" "}
            <span className="font-bold text-cyan-400">{character?.name}</span>
          </h1>
          <p>
            Class:{" "}
            <span className="font-bold text-purple-400">
              {character?.class}
            </span>
          </p>
          <p>
            Obtained:{" "}
            <span className="text-lime-400">
              {
                character?.items?.filter((item) => item.obtained === true)
                  .length
              }
              /{character?.items?.length}
            </span>{" "}
            (
            {(
              (character?.items?.filter((item) => item.obtained === true)
                .length /
                character?.items?.length) *
              100
            ).toFixed(2)}
            %)
          </p>
          <div className="w-full justify-center">
            <button
              className="bg-red-400 hover:bg-red-700 text-white font-bold p-2 rounded duration-200"
              onClick={() => uncheckAllItems()}
            >
              Uncheck All
            </button>
          </div>
        </div>
      </div>
      <input
        type="text"
        className="w-full border border-white outline-none px-1"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="flex flex-wrap border border-white justify-between p-1">
        {character?.items
          ?.filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          ?.map((item) => (
            <img
              className={`${item.obtained ? "bg-green-400" : "bg-red-400"}`}
              key={item.id}
              src={item.image}
              onClick={() => updateItemStatus(item.id)}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default CharacterInfo;
