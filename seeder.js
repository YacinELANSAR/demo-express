const connectToDB = require("./config/connectionDataBase");
const {booksData,authorsData} = require("./data");
const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
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
// import authors
async function importAuthors() {
  try {
    await Author.insertMany(authorsData);
    console.log("Authors Imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
// remove authors
async function removeAuthors() {
  try {
    await Author.deleteMany();
    console.log("Authors removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (process.argv[2] === "-importBooks") {
  importBooks();
} else if (process.argv[2] === "-removeBooks") {
  removeBooks();
}else if (process.argv[2] === "-importAuthors") {
    importAuthors();
  }else if (process.argv[2] === "-removeAuthors") {
    removeAuthors();
  }
