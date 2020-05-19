const express = require("express");
const path = require("path");

const app = express();
const staticPath = path.join(__dirname,"public");

app.use(express.static(staticPath));

app.get("/",(req,res) => {
    res.sendFile(staticPath + "index.html");
})

app.listen(8080);