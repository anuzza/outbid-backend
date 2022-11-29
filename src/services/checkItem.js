const cron = require("node-cron");
const Item = require("../models/item");

const checkForItemEnding = () => {
  // Schedule tasks to be run on the server.
  cron.schedule("* * * * *", async function async() {
    // const items = await Item.find();
    // for (item of items) {
    //   item.end_date = tomorrow;
    //   await item.save();
    // }
  });
};

module.exports = {
  checkForItemEnding,
};
