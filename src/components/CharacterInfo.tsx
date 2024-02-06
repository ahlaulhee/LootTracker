import { useParams } from "react-router-dom";
import { Character } from "../vite-env";
import { useEffect, useState } from "react";
import axios from "axios";
import classData from "../../rotmgClasses.json";

function CharacterInfo() {
  const [character, setCharacter] = useState<Character>();
  const [searchInput, setSearchInput] = useState("");
  const { id } = useParams();

  const updateItemStatus = async (id: number) => {
    if (!character) return;
    await axios.put(
      `http://localhost:3000/character/${character.id}/updateItem/${id}`
    );
  };

  const fetchCharacter = async () => {
    if (!id) return;
    const userId = parseInt(id) - 1;
    const character = await axios.get(
      `http://localhost:3000/character/${userId}`
    );
    setCharacter(character.data);
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

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
            {(character?.items?.filter((item) => item.obtained === true)
              .length /
              character?.items?.length) *
              100}
            %)
          </p>
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
