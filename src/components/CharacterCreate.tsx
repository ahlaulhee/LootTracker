import { useState } from "react";
import classData from "../../rotmgClasses.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CharacterCreate() {
  const [characterInfo, setCharacterInfo] = useState<{
    name: string;
    charClass: string;
    allItems: boolean;
  }>({
    name: "",
    charClass: "",
    allItems: false,
  });

  const [errors, setErrors] = useState<{
    name: string;
    charClass: string;
  }>({
    name: "",
    charClass: "",
  });

  const navigate = useNavigate();

  const createCharacter = async () => {
    const tmpErrors: { name: string; charClass: string } = {
      name: "",
      charClass: "",
    };

    if (!characterInfo.name || characterInfo.name.length > 15) {
      tmpErrors.name =
        "The name can't be empty and must be no longer than 15 characters";
    }
    if (!characterInfo.charClass) {
      tmpErrors.charClass = "You must select a class";
    }
    setErrors(tmpErrors);
    if (tmpErrors.name || tmpErrors.charClass) {
      return;
    }

    await axios
      .post("http://localhost:3000/character", characterInfo)
      .then(() => {
        navigate("/");
      });
  };
  return (
    <div className="flex flex-col border border-white p-3 rounded m-3 space-y-6">
      <h1 className="text-center text-3xl font-semibold">
        Create your Character
      </h1>
      <div className="flex justify-center">
        <input
          className="p-2 w-2/3"
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setCharacterInfo({ ...characterInfo, name: e.target.value })
          }
        />
      </div>
      {errors.name ? (
        <p className="text-red-600 text-sm text-center">{errors.name}</p>
      ) : null}
      <div className="flex flex-wrap justify-center">
        {classData.map((cl) => (
          <img
            id={cl.className}
            className={`h-16 w-16 p-2 ${
              characterInfo.charClass === cl.className ? "bg-green-400" : ""
            }`}
            src={cl.classImage}
            alt={cl.className}
            onClick={() =>
              setCharacterInfo({ ...characterInfo, charClass: cl.className })
            }
          />
        ))}
      </div>
      {errors.charClass ? (
        <p className="text-red-600 text-sm text-center">{errors.charClass}</p>
      ) : null}
      <div className="flex justify-center items-center space-x-2">
        <input
          className="h-8 w-8"
          type="checkbox"
          onChange={() =>
            setCharacterInfo({
              ...characterInfo,
              allItems: !characterInfo.allItems,
            })
          }
        />
        <p className="text-xl">Show all items</p>
      </div>
      <button
        className="border-2 rounded p-2 text-2xl bg-green-600 hover:bg-green-700 duration-200"
        onClick={createCharacter}
      >
        Create character!
      </button>
    </div>
  );
}

export default CharacterCreate;
