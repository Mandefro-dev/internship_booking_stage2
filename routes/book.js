const express = require("express");
const router = express.Router();
const Book = require("../base/Book");
const mongoose = require("mongoose");

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).send("Error in getting books from database", error.message);
  }
});
router.post("/books", async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;
  try {
    if (!title || !author || !isbn || !publishedYear)
      return res.status(400).json("All fields are required");

    const newBook = new Book({ title, author, ISBN: isbn, publishedYear });
    await newBook.save();
    res.status(201).json({ message: "Book added succesfuly;" });
  } catch (error) {}
});

router.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, publishedYear } = req.body;

    if (!title || !author || !isbn || !publishedYear)
      return res.status(400).json("All fields are required");
    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        ISBN: isbn,
        publishedYear,
      },
      { new: true }
    );

    if (book) {
      res.status(200).json("book updated succesfully");
    } else {
      return res.status(404).json({ message: "Book is not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating book", error: error.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(404).json({ message: "Book deleted succesfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting book", error: error.message });
  }
});
router.get("/books/recommendations", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length < 0)
      return res.status(404).json({ message: "No books availiable" });
    const random = books[Math.floor(Math.random() * books.length)];
    res.status(200).json({ recommendations: random });
  } catch (error) {
    res
      .status(400)
      .json({ messsage: "Error inffetching recommendation books" });
  }
});

module.exports = router;
