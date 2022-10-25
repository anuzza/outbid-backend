const express = require("express");
const cors = require("cors");
const connectDB = require("./src/database/mongoose");
const userRouter = require("./src/routes/user");
const itemRouter = require("./src/routes/item");

connectDB();

const app = express();

const port = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/users", userRouter);
app.use("/itemPost", itemRouter);


app.get("/:id", async (req, res) => {
  console.log(req.params);
  res.send({ msg: "hello world" });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
