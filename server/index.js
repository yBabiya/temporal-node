import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("GET", req.query.name);
  return res.send("Got /");
});

app.get("/next", (req, res) => {
  console.log("Magic", req.query.name);
  return res.send("Got Next");
});

app.listen(7000, () => {
  console.log("Growing Everyday 🚀🚀 ");
});
