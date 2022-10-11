const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jwright:P4nd4Be4r@cluster0.mv4t0qw.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    console.log("Connection Failed");
    process.exit(1);
  }
};

module.exports = connectDB;
