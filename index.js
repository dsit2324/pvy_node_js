const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
let messages = [];

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", function(req, res){
    res.send("Navštívili jste server: Dominik");
});

app.post("/send", function(req, res){
    console.log(req.body);
    messages.push(req.body);
    console.log(messages);
});

app.listen(port, function(){
    console.log(`Server naslouchá na portu ${port}`);
});