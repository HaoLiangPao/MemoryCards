const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const fs = require("fs");

// Get Environment Variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
const conn = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Load models in mongoDB
const MemoCollection = require("./models/MemoCollection");
const User = require("./models/User");

// Get seeder data
const memoryCollections = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collections.json`)
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`));

// Import data into database
const importData = async () => {
  try {
    await MemoCollection.create(memoryCollections);
    console.log("MemoryCard Collection data imported...".green.inverse);
    await User.create(users);
    console.log("User data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from database
const deleteData = async () => {
  try {
    await MemoCollection.deleteMany();
    console.log("MemoryCard Collection data deleted".red.inverse);
    await User.deleteMany();
    console.log("User data deleted".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// --- Command Line command ---
// node  seeder  -i
//  [0]   [1]   [2]
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
