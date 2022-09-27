const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.get("/users", async (req, res) => {
  res.send({
    data: "hello world",
  });
});

app.post("/users", async (req, res) => {
  const msg = req.body?.message || "hello world";
  res.send({
    msg,
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
