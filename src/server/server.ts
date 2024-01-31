import express from "express";
const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello World");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
