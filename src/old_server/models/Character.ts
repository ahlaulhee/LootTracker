// The character contains the class,
// a boolean that specifies if he wants to see only the items useful to their class or all
// boolean to remove limitedUTs???????
// The items

import sequelize from "../db";
import { DataTypes } from "sequelize";
import Item from "./Item";

const Character = sequelize.define("Character", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: true },
  class: { type: DataTypes.STRING, allowNull: false },
  //   items: { type: DataTypes.ARRAY, allowNull: false },
});

Character.hasMany(Item, { as: "items" });
Item.belongsTo(Character);

export default Character;
