import data from "../../data.json";
import { Character, Item } from "../vite-env";

const charEquipmentDict: {
  [key: string]: { weapon: string; ability: string };
} = {
  Rogue: { weapon: "Dagger", ability: "Cloaks" },
  Archer: { weapon: "Bow", ability: "Quivers" },
  Wizard: { weapon: "Staff", ability: "Spells" },
  Priest: { weapon: "Wand", ability: "Tomes" },
  Warrior: { weapon: "Sword", ability: "Helms" },
  Knight: { weapon: "Sword", ability: "Shields" },
  Paladin: { weapon: "Sword", ability: "Seals" },
  Assasin: { weapon: "Dagger", ability: "Poisons" },
  Necromancer: { weapon: "Staff", ability: "Skulls" },
  Huntress: { weapon: "Archer", ability: "Traps" },
  Mystic: { weapon: "Staff", ability: "Orbs" },
  Trickster: { weapon: "Dagger", ability: "Prisms" },
  Sorcerer: { weapon: "Wand", ability: "Scepters" },
  Ninja: { weapon: "Katana", ability: "Stars" },
  Samurai: { weapon: "Katana", ability: "Wakizashi" },
  Bard: { weapon: "Bow", ability: "Lutes" },
  Summoner: { weapon: "Wand", ability: "Maces" },
  Kensei: { weapon: "Katana", ability: "Sheaths" },
};

export const getItems = () => {
  const itemsArr: Item[] = [];

  data.forEach((el, i) => {
    if (!el.Name || !el.Tier || !el.Image || !el.Type || !el["Specific Type"])
      return;
    itemsArr.push({
      id: i,
      name: el.Name,
      tier: el.Tier,
      image: el.Image,
      type: el.Type,
      specificType: el["Specific Type"],
      obtained: false,
      obtainedDate: null,
    });
  });

  return itemsArr;
};

export const getItemsByCharacter = (
  charWeapon: string,
  charAbility: string
) => {
  const itemsArr: Item[] = [];

  data.forEach((el, i) => {
    if (!el.Name || !el.Tier || !el.Image || !el.Type || !el["Specific Type"])
      return;

    if (
      (el.Type !== "Ability" || el["Specific Type"] === charAbility) &&
      (el.Type !== "Weapon" || el["Specific Type"] === charWeapon)
    ) {
      itemsArr.push({
        id: i,
        name: el.Name,
        tier: el.Tier,
        image: el.Image,
        type: el.Type,
        specificType: el["Specific Type"],
        obtained: false,
        obtainedDate: null,
      });
    }
  });

  return itemsArr;
};

export const postCharacter = (
  id: number,
  name: string,
  charClass: string,
  allItems: boolean
): Character => {
  const items = allItems
    ? getItems()
    : getItemsByCharacter(
        charEquipmentDict[charClass].weapon,
        charEquipmentDict[charClass].ability
      );
  const char: Character = { id, name, class: charClass, items };

  return char;
  // Create character
};

export const deleteCharacter = (id: number) => {
  // Delete character
};

export const putItemStatus = (id: number) => {
  // Update item status to obtained : true
};

export const putUncheckAllItems = (id: number) => {
  // Update all items of a character to obtained: false
};
