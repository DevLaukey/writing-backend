var dotenv = require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
console.log(require("dotenv").config());
app.use(cors());


const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to db"));

app.use(express.json());


const ordersRouter = require("./routes/orders");

app.use("/orders", ordersRouter);


app.listen(PORT, () => console.log("Started"));
