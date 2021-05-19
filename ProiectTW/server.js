// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require("uuid");

const fs = require("fs");

// Aplicatie
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Link proiect files
//app.use("/", express.static('proiect'));


// Create
app.post("/filme", (req, res) => {
    const filmeList = readJSONfile();
    const newFilm = req.body;
    newFilm.id = uuidv1();
    const newFilmeList = [...filmeList, newFilm];
    writeJSONFile(newFilmeList);
    res.json(newFilm);
});

// Read One
app.get("/filme/:id", (req, res) => {
    const filmeList = readJSONFile();
    const id = req.params.id;
    let idFound = false;
    let foundFilm;

    filmeList.forEach(film => {
        if(id === film.id) {
            idFound = true;
            foundFilm = film;
        }
    });

    if(idFound) {
        res.json(foundFilm);
    }
    else {
        res.status(404).send(`Film ${id} was not found`);
    }
});

// Read All
app.get("/filme", (req, res) => {
    const filmeList = readJSONFile();
    res.json(filmeList);
});

// Update
app.put("/filme/:id", (req, res) => {
    const filmeList = readJSONFile();
    const id = req.params.id;
    const newFilm = req.body;
    newFilm.id = id;
    idFound = false;

    const newFilmeList = filmeList.map((film) => {
        if(film.id === id) {
            idFound = true;
            return newFilm;
        }
        return film;
    })

    writeJSONFile(newFilmeList);

    if(idFound) {
        res.json(newFilm);
    }
    else {
        res.status(404).send(`Film ${id} was not found`);
    }
});

// Delete
app.delete("/filme/:id", (req, res) => {
    const filmeList = readJSONFile();
    const id = req.params.id;
    const newFilmeList = filmeList.filter((film) => film.id !== id)

    if(filmeList.length !== newFilmeList.length) {
        res.status(200).send(`Film ${id} removed`);
        writeJSONFile(newFilmeList);
    }
    else {
        res.status(404).send(`Film ${id} was not found`);
    }
});


// Functia de citire din fisierul proiect.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("proiect.json"))["filme"];
}

// Functia de scriere in fisierul proiect.json
function writeJSONFile(content) {
    fs.writeFileSync(
        //"proiect.json",
        JSON.stringify({filme: content}),
        "utf8",
        err => {
            if(err) {
                console.log(err);
            }
        }
    );
}

// Pornim server-ul
app.listen("3000", () => 
console.log("Server started at: http://localhost:3000"));