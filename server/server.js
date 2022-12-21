const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database
const dbURL =
  "mongodb+srv://miladTech:milad1234@nodeandexpress.84kxwy4.mongodb.net/mernCrud?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`DB is connected to ${res.connection.host} `))
  .catch((err) => console.log(err));

const postSchema = mongoose.Schema({
  fName: String,
  lName: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Post = mongoose.model("post", postSchema);

app.get("/", (req, res) => {
  res.send("Welcome to express js");
});

app.post("/create", (req, res) => {
  Post.create({
    fName: req.body.fName,
    lName: req.body.lName,
  })
    .then((doc) => doc)
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find().then((item) => console.log(res.json(item)));
});

app.delete("/delete/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      fName: req.body.fName,
      lName: req.body.lName,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen("3001", () => {
  console.log("App is running in Localhost 3001");
});
