import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

export default sequelize;
