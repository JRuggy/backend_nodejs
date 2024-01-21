import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

// configure database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejstrial"
})

// parse JSON requests
app.use(express.json())

// enabling cross origin
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello this is backend");
})

app.get("/books", (req, res) => {
    const q = "select * from books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// for posting books
app.post("/books", (req, res) => {
    const q = "insert into books (`title`,`description`,`cover`,`price`) values(?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books has been created successfully")
    })
})

// endpoint for deleting books
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "delete from books where id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted successfully");
    })
})

// endpoint for updating books
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "update books set `title` = ?, `description`=?, `price` = ?, `cover` = ? where id = ?"

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been updated successfully");
    })
})

app.listen(8800, () => {
    console.log("Connected Successfully");
})

