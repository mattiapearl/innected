//Include
const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");

// const helmet = require("helmet");

const podcastRoutes = require("./routes/podcastRoutes.js");
const authRoutes = require("./routes/authRoutes");

// Express app
const app = express();

//Connect to MongoDB
const dbURI = process.env.INN_MDB_URI;
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to DB: innected-web01");
        // Listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

//register view enjine
app.set("view engine", "ejs");

// MIDDLEWARE
// Static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Routes Middleware
app.get("*", checkUser);

//Index Route
app.get("/", (req, res) => {
    res.render("index", { title: "Innected", link: "/" });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "Innected", link: "/about" });
});

//Podcast Routes
app.use("/podcast", podcastRoutes);

//Auth Routes
app.use(authRoutes);

//404 It must be at the bottom, or it will fire before other requests. THIS will respond whatever happens. So it mus
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404 | Innected",
        link: "/404",
    });
});

//GET get data
//POST request to create new data
//DELETE request to delete data
//PUT request to update data
