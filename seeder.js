const connectToDB = require("./config/connectionDataBase");
const booksData = require("./data");
const { Book } = require("./models/Book");
require("dotenv").config({ path: "./config/.env" });

// connection to DataBase
connectToDB();

// import books
async function importBooks() {
  try {
    await Book.insertMany(booksData);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
// remove books
async function removeBooks() {
  try {
    await Book.deleteMany();
    console.log("Books removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
}
