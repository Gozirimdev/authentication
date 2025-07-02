const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const connect = require('./database/db')
const port = 3000;

const app = express();
app.use(express.json())

// mongoose.connection();

connect()

app.use("/auth", require('./Routes/auth'));

app.get('/shyt',async (req,res) => {
    res.end('hello')
})

app.listen(port , ()=>{
    console.log(`server running at http://127.0.0.1:${port}` )
})
