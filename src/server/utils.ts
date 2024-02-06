import data from "../../data.json";
import { Character, Item } from "../vite-env";

const charEquipmentDict: {
  [key: string]: { weapons: string[]; ability: string; armor: string };
} = {
  Rogue: {
    weapons: ["Daggers", "Dual Blades"],
    ability: "Cloaks",
    armor: "Leather Armors",
  },
  Assassin: {
    weapons: ["Daggers", "Dual Blades"],
    ability: "Poisons",
    armor: "Leather Armors",
  },
  Trickster: {
    weapons: ["Daggers", "Dual Blades"],
    ability: "Prisms",
    armor: "Leather Armors",
  },
  Archer: {
    weapons: ["Bows", "Longbows"],
    ability: "Quivers",
    armor: "Leather Armors",
  },
  Bard: { weapons: ["Bows", "Longbows"], ability: "Lutes", armor: "Robes" },
  Huntress: {
    weapons: ["Bows", "Longbows"],
    ability: "Traps",
    armor: "Leather Armors",
  },
  Wizard: {
    weapons: ["Staves", "Spellblades"],
    ability: "Spells",
    armor: "Robes",
  },
  Mystic: {
    weapons: ["Staves", "Spellblades"],
    ability: "Orbs",
    armor: "Robes",
  },
  Necromancer: {
    weapons: ["Staves", "Spellblades"],
    ability: "Skulls",
    armor: "Robes",
  },
  Priest: {
    weapons: ["Wands", "Morning Stars"],
    ability: "Tomes",
    armor: "Robes",
  },
  Sorcerer: {
    weapons: ["Wands", "Morning Stars"],
    ability: "Scepters",
    armor: "Robes",
  },
  Summoner: {
    weapons: ["Wands", "Morning Stars"],
    ability: "Maces",
    armor: "Robes",
  },
  Warrior: {
    weapons: ["Swords", "Flails"],
    ability: "Helms",
    armor: "Heavy Armors",
  },
  Knight: {
    weapons: ["Swords", "Flails"],
    ability: "Shields",
    armor: "Heavy Armors",
  },
  Paladin: {
    weapons: ["Swords", "Flails"],
    ability: "Seals",
    armor: "Heavy Armors",
  },
  Ninja: {
    weapons: ["Katanas", "Tachis"],
    ability: "Stars",
    armor: "Leather Armors",
  },
  Samurai: {
    weapons: ["Katanas", "Tachis"],
    ability: "Wakizashi",
    armor: "Heavy Armors",
  },
  Kensei: {
    weapons: ["Katanas", "Tachis"],
    ability: "Sheaths",
    armor: "Heavy Armors",
  },
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
  charWeapons: string[],
  charAbility: string,
  charArmor: string
) => {
  const itemsArr: Item[] = [];

  data.forEach((el, i) => {
    if (!el.Name || !el.Tier || !el.Image || !el.Type || !el["Specific Type"])
      return;

    if (
      (el.Type !== "Ability" || el["Specific Type"] === charAbility) &&
      (el.Type !== "Armor" || el["Specific Type"] === charArmor) &&
      (el.Type !== "Weapon" || charWeapons.includes(el["Specific Type"]))
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
        charEquipmentDict[charClass].weapons,
        charEquipmentDict[charClass].ability,
        charEquipmentDict[charClass].armor
      );
  const char: Character = { id, name, class: charClass, items };

  return char;
  // Create character
};

export const deleteCharacter = (id: number) => {
  // Delete character
  console.log(id);
};

export const putItemStatus = (id: number) => {
  // Update item status to obtained : true
  console.log(id);
};

export const putUncheckAllItems = (id: number) => {
  // Update all items of a character to obtained: false
  console.log(id);
};
