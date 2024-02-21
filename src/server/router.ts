import express from "express";
const router = express.Router();
import { JsonDB, Config } from "node-json-db";
import { Character } from "../vite-env";
import { postCharacter } from "./utils";

const db = new JsonDB(new Config("userData", true, false, "/"));

import items from "../../data.json";
router.get("/items", async function (_req, res) {
  res.status(200).json(items);
});

router.get("/character", async function (_req, res) {
  try {
    const characters = await db.getData("/characters");
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/character/:charId", async function (req, res) {
  try {
    const charId = req.params.charId;
    const characters: Character[] = await db.getData(`/characters`);
    const character = characters.find((char) => char.id === parseInt(charId));
    if (!character) res.status(404).json({ message: "Character not found" });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO: Initialize an empty array for the characters array if characters key doesn't exist
router.post("/character", async function (req, res) {
  try {
    const { name, charClass, allItems } = req.body;
    console.log(name, charClass, allItems);
    if (!name || !charClass || allItems === null) {
      throw new Error("Missing required properties in request body");
    }
    const newCharId = (await db.count("/characters")) + 1;
    const character = postCharacter(newCharId, name, charClass, allItems);
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
  try {
    const charId = req.params.charId;
    const allChars: Character[] = await db.getData("/characters");
    const filteredChars = allChars.filter(
      (char: Character) => char.id !== parseInt(charId)
    );
    await db.push("/characters", filteredChars, true);
    res.status(200).json({ message: "Character Deleted", charId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/character/:charId/items/:itemId", async function (req, res) {
  try {
    const itemId = req.params.itemId;
    const charId = req.params.charId;
    // const character: Character = await db.getData(`/characters[${charId}]`);
    const characters: Character[] = await db.getData(`/characters`);
    const character = characters.find((char) => char.id === parseInt(charId));
    if (!character)
      return res.status(404).json({ message: "Character not found" });
    const charIndex = characters.indexOf(character);
    character.items.forEach((item) => {
      if (item.id === parseInt(itemId)) {
        item.obtained = !item.obtained;
      }
    });
    await db.push(`/characters[${charIndex}]`, character, true);
    res.status(200).json({ message: "Item Updated Successfuly" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/character/:charId/uncheckAll", async function (req, res) {
  try {
    const charId = req.params.charId;
    const characters: Character[] = await db.getData(`/characters`);
    const character = characters.find((char) => char.id === parseInt(charId));
    if (!character)
      return res.status(404).json({ message: "Character not found" });
    const charIndex = characters.indexOf(character);
    character.items.forEach((item) => {
      item.obtained = false;
    });
    await db.push(`/characters[${charIndex}]`, character, true);
    res.status(200).json({ message: "Items Updated Successfuly" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
