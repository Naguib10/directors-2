const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const fse = require('fs-extra');
const sharp = require('sharp');
const sanitizeHTML = require("sanitize-html");
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

app.get("/test", async (req, res) => {
    res.send("it works");
})

app.get("/movies", async (req, res) => {
    //res.send("hello there");
    //var chosenDirector = req.body.director;
    //chosenDirector = "Darren Aronofsky";
    const allMovies = await db.collection('movies').find().toArray();
    res.json(allMovies);
    console.log(allMovies);

})

app.get("/movies/:name", async (req, res) => {
    const chosenDirector = req.params.name;
    const allMovies = await db.collection('movies').find({ director: chosenDirector }).toArray();
    res.json(allMovies);
    //console.log(chosenDirector);

})

app.post("/create-director", upload.single("photo"), myCleanup, async (req, res) => {
    if (req.file) {
        const photoFileName = `${Date.now()}.jpg`;
        await sharp(req.file.buffer).resize(600, 600).jpeg({ quality: 60 }).toFile(path.join("public", "photos", photoFileName));
        req.cleanData.photo = photoFileName;
    }

    const info = await db.collection("directors").insertOne(req.cleanData);
    const newDirector = await db.collection("directors").findOne({ _id: new ObjectId(info.insertedId) })
    res.send(newDirector);
    //console.log("the new is " + newDirector);
})

app.post("/create-movie", upload.single("photo"), async (req, res) => {
    if (req.file) {
        const photoFileName = `${Date.now()}.jpg`;
        await sharp(req.file.buffer).resize(600, 600).jpeg({ quality: 60 }).toFile(path.join("public", "photos", photoFileName));
        req.body.photo = photoFileName;
    }

    const info = await db.collection("movies").insertOne(req.body);
    // const newMovie = await db.collection("movies").findOne({ _id: new ObjectId(info.insertedId) })
    // res.send(newMovie);

})


app.put("/update-movie/:id", upload.single("photo"), async (req, res) => {
    if (req.file) {
        const photoFileName = `${Date.now()}.jpg`;
        await sharp(req.file.buffer).resize(600, 600).jpeg({ quality: 60 }).toFile(path.join("public", "photos", photoFileName));
        req.body.photo = photoFileName;
    }

    const info = await db.collection("movies").findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body });
    res.send();

})


app.delete("/movies/:id", async (req, res) => {
    const doc = await db.collection("movies").findOne({ _id: new ObjectId(req.params.id) })
    if (doc.photo) {
        fse.remove(path.join("public", "photos", doc.photo))
    }
    db.collection("movies").deleteOne({ _id: new ObjectId(req.params.id) })
})

function myCleanup(req, res, next) {
    if (typeof req.body.name != "string") req.body.name = ""
    if (typeof req.body.dob != "string") req.body.dob = ""
    if (typeof req.body._id != "string") req.body._id = ""

    req.cleanData = {
        name: sanitizeHTML(req.body.name.trim(), { allowedTags: [], allowedAttributes: {} }),
        dob: sanitizeHTML(req.body.dob.trim(), { allowedTags: [], allowedAttributes: {} })
    }

    next()
}


async function start() {
    const client = new MongoClient("mongodb://root:root@localhost:27017/DirectorsApp?&authSource=admin");
    await client.connect();
    db = client.db();
    app.listen(5000);
}

start();

