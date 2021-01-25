const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const mongojs = require("mongojs");
const db = require("./models");

const app = express();

// Logging
app.use(logger("dev"));

// Post req middleware (adds payload to req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workouts_db";
const collections = ["workouts"];

const PORT = process.env.PORT || 3000;

// Routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

mongoose.connect(
	//changing back from workouts_db to workout
	process.env.MONGODB_URI || "mongodb://localhost/workout",
	{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,    
		useFindAndModify: false,
	}
);

// Routes
// GET api/workouts -- not sure if this one is right !!!!
// app.get("/", (req, res) => {
// 	res.send(index.html);
// });
// // GET exercise
// app.get("/exercise", (req, res) => {
// 	res.sendFile(path.join(__dirname, "/public/exercise.html"));
// });

// // GET exercise
// app.get("/stats", (req, res) => {
// 	res.sendFile(path.join(__dirname, "/public/stats.html"));
// });

app.listen(process.env.PORT || 3000, () => {
	console.log(`App running on port ${PORT}!`);
});
