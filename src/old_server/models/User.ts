// The user stores all the characters that he's playing atm

import sequelize from "../db";
import { DataTypes } from "sequelize";
import Character from "./Character";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    // characters: {
    //   type: DataTypes.ARRAY,
    //   allowNull: true,
    // },
  },
  { timestamps: false }
);

User.hasMany(Character, { as: "characters" });
Character.belongsTo(User);

export default User;
