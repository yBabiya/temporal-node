import express from "express";

const app = express();

app.get("/confirmation", (req, res) => {
  console.log("Confirm : ", req.query.name);
  return res.send("Got Confirmation");
});

app.get("/blocked", (req, res) => {
  console.log("Blocked : ", req.query.name);
  return res.send("Got Blocked");
});

app.listen(7000, () => {
  console.log("Growing Everyday 🚀🚀 ");
});
