const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let messages = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const storage = require("./storage/jsonStorage");
const storage = require("./storage/sqliteStorage.js");

app.post("/send", function(req, res) {    
    messages.push(req.body);
    console.log(req.ip);
    storage.addMessage(req.body.username, req.body.message, req.ip);
    console.log(messages);
    res.redirect("/");
});

app.get("/messages", function(req, res) {
    res.json(storage.getMessages());

});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", function (req, res) {
    res.send("Navštívili jste server: Dominik Svoboda");
});

app.listen(port, function() {
    console.log(`Server naslouchá na portu ${port}`);
});

