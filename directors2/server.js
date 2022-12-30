const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const fse = require('fs-extra');
const sharp = require('sharp');
const multer = require("multer");
const upload = multer();
const path = require('path');

let db;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//app.use(express.static("public"))

fse.ensureDirSync(path.join("public", "photos"));

app.get("/", async (req, res) => {
    //res.send("hello there");
    const allDirectors = await db.collection('directors').find().toArray();
    res.json(allDirectors);

})

app.post("/create-director", upload.single("photo"), async (req, res) => {
    if (req.file) {
        const photoFileName = `${Date.now()}.jpg`;
        await sharp(req.file.buffer).resize(800, 400).jpeg({ quality: 60 }).toFile(path.join("public", "photos", photoFileName));
        req.photo = photoFileName;
    }

    const info = await db.collection("directors").insertOne(req);
    const newDirector = await db.collection("directors").findOne({ _id: new ObjectId(info.insertedId) })
    res.send(newDirector);
})


async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/DirectorsApp?&authSource=admin");
    await client.connect();
    db = client.db();
    app.listen(5000);
}

start();

