const express = require("express");
const app = express();
const connectDb = require("./db/db");
const bookRoutes = require("./routes/book");

connectDb();
app.use(express.json());

app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Books API");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening to the ${PORT}`);
});
