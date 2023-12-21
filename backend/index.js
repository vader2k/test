import express  from "express";
import mysql from "mysql";
import cors from 'cors'

// initializing express
const app = express()

// adding an express server middleware so u can send data to ur express server
app.use(express.json())

// adding cors so as to allow cors permission
app.use(cors())

// creating a databse connection after importing mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "781227",
    database: "test"
})

// creating a connection call for the backend to test if it connected after importing express and initializing it
app.listen(2000 ,()=> {
    console.log("connected to backend!")
})

// creating a test to show that you succesfully connected to the backend when u visit the homepage (localhost:2000)
app.get("/", (req, res)=>{
    res.json("hello, this is the backend")
})

// a code to return all books inside the database
app.get("/books", (req,res)=> {
   const q = "SELECT * FROM books";
   db.query(q, (err, data)=>{
    if (err) return res.json(err)
    return res.json(data)
   })
})


// how to create a book inside the database
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`, `price`) VALUES (?)"
    // putting in values by urself from the backend
    // const values = ["title from backend","desc from backend", "cover pic from backend" ]


    // allowing the users to put their own value from the frontend
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [values] , (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully")
    })
})

// how to delete a book from the database
app.delete("/books/:id", (req, res) => {
    // this is used to get the particular id for the book you want to delete
    const bookId = req.params.id

    // this is the query to delete the book from the databse
    const q = "DELETE FROM books WHERE id = ?";

db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Book has been deleted successfully")
})
})



// Update a book in the database
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    // Allowing the users to put their own value from the frontend
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error updating book");
        }

        if (data.affectedRows === 0) {
            // If no rows were affected, it means the book with the specified ID wasn't found
            return res.status(404).json("Book not found");
        }

        return res.json("Book has been updated successfully");
    });
});