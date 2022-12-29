const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

let db;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.use(express.static("public"))

app.get("/", async (req, res) => {
    //res.send("hello there");
    const allDirectors = await db.collection('directors').find().toArray();
    res.json(allDirectors);

})


async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/DirectorsApp?&authSource=admin");
    await client.connect();
    db = client.db();
    app.listen(5000);
}

start();

