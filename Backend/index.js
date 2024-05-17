import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL configuration
const pool = new pg.Pool({
  user: "postgres", // Change to your PostgreSQL username
  password: "1234", // Change to your PostgreSQL password
  host: "localhost",
  port: 5432,
  database: "postgres", // Change to your PostgreSQL database name
});

// Route to check if the server is running
app.get("/", (req, res) => {
  res.json("hello");
});

// Route to fetch all books from PostgreSQL database
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  pool.query(q, (err, result) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(result.rows);
  });
});

// Route to insert a new book into the PostgreSQL database
app.post("/books", (req, res) => {
  const { title, desc, price, cover } = req.body;
  const q = "INSERT INTO books(title, desc, price, cover) VALUES ($1, $2, $3, $4)";
  const values = [title, desc, price, cover];
  
  pool.query(q, values, (err, result) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "Book inserted successfully" });
  });
});

// Route to delete a book from the PostgreSQL database
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = $1";
  
  pool.query(q, [bookId], (err, result) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "Book deleted successfully" });
  });
});

// Route to update a book in the PostgreSQL database
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, desc, price, cover } = req.body;
  const q = "UPDATE books SET title = $1, desc = $2, price = $3, cover = $4 WHERE id = $5";
  const values = [title, desc, price, cover, bookId];
  
  pool.query(q, values, (err, result) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "Book updated successfully" });
  });
});

// Start the server
app.listen(8800, () => {
  console.log("Connected to backend.");
});
