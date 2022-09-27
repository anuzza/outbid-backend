const express = require("express");
const connectDB = require("./src/database/mongoose");
const userRouter = require("./src/routes/user");

connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/users", userRouter);
app.get("/:id", async (req, res) => {
  console.log(req.params);
  res.send({ msg: "hello world" });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
