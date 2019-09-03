require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

const AUTH_SECRET = process.env.AUTH_SECRET;
const PORT = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/user", routes);


app.listen(PORT, () => console.log('Listening on PORT', PORT));