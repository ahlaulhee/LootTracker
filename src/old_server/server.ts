import express from "express";
const app = express();
const port = 3000;
import sequelize from "./db";
import routes from "./routes/routes";

app.use(express.json);
app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
