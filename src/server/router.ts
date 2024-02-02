import express from "express";
const router = express.Router();
import { JsonDB, Config } from "node-json-db";
import { Character } from "../vite-env";
import { postCharacter } from "./utils";

const db = new JsonDB(new Config("userData", true, false, "/"));

router.post("/character", async function (req, res) {
  //   const previousCharacters: Character[] = await db.getData("/");
  //   const newCharId = previousCharacters.length + 1;
  try {
    const { name, charClass, allItems } = req.body;
    console.log(name, charClass, allItems);
    if (!name || !charClass || allItems === null) {
      throw new Error("Missing required properties in request body");
    }
    const newCharId = (await db.count("/characters")) + 1;
    const character = postCharacter(newCharId, name, charClass, allItems);
    //   const character = postCharacter(0, "Test", "Knight", true);
    // await db.push("/characters", [], false);
    const allCharacters: Character[] = await db.getData("/characters");
    allCharacters.push(character);
    await db.push("/characters", allCharacters, true);
    res.status(200).json({ message: "Character Created", character });
  } catch (error) {
    console.error("Error adding character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/character/:charId", async function (req, res) {
  const charId = req.params.charId;
  //   const char : Character = await db.getIndex('/', charId)
  const allChars: Character[] = await db.getData("/");
  const filteredChars = allChars.filter(
    (char: Character) => char.id !== parseInt(charId)
  );
  await db.push("/", filteredChars, true);
  res.status(200).json({ message: "Character Deleted", charId });
});

router.put("/character/:charId/updateItem/:itemId", async function (req, res) {
  console.log(req.params.charId);
  console.log(req.params.itemId);
  res.send("Item Updated");
});

router.put(
  "/character/:charId/updateItem/uncheckAll",
  async function (req, res) {
    console.log(req.params.charId);
    res.send("Items Updated");
  }
);

export default router;