// The item contains
// Name
// Tier
// Image
// Type
// Specific Type
// Class? (Knight, Archer, ALL)
// Obtained (default to false)
// ObtainedDate nullable Date

import sequelize from "../db";
import { DataTypes } from "sequelize";

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    tier: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    specificType: { type: DataTypes.STRING, allowNull: false },
    // class: { type: DataTypes.STRING, allowNull: true },
    obtained: { type: DataTypes.BOOLEAN, defaultValue: false },
    obtainedDate: { type: DataTypes.DATE, allowNull: true },
  },
  { timestamps: false }
);

export default Item;
