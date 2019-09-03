require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const authMiddleware = require("./middlewares/authMiddleware");
const routes = require("./routes/routes");

const PORT = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", authMiddleware.validate, (req, res) => res.send("Hello world"));

app.use("/user", routes);


app.listen(PORT, () => console.log('Listening on PORT', PORT));