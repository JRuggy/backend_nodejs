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
    const q = "insert into books (`title`,`description`,`cover`) values(?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Books has been created successfully")
    })
})

app.listen(8800, () => {
    console.log("Connected Successfully");
})

