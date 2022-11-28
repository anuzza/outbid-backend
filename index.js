const express = require("express");
const cors = require("cors");
const connectDB = require("./src/database/mongoose");
const userRouter = require("./src/routes/user");
const itemRouter = require("./src/routes/item");
const bidRouter = require("./src/routes/bid");
const saveItemRouter = require("./src/routes/savedItem");

connectDB();

const app = express();

const port = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/bids", bidRouter);
app.use("/save-item", saveItemRouter);

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
