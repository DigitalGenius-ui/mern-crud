const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/upload", express.static(path.join(__dirname, "/upload")));

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

//schema
const postSchema = mongoose.Schema({
  fName: String,
  lName: String,
  photo: String,
});

// model part
const Post = mongoose.model("post", postSchema);

// fileUpload part
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json("File has been uploaded");
})

app.get("/", (req, res) => {
  res.send("Welcome to express js");
});

app.post("/createPost", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(404).json("Post has not been created")
  }
});

app.get("/posts", (req, res) => {
  Post.find().then((item) => res.json(item));
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post Has been deleted");
  } catch (error) {
    res.status(200).json(error.message);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        fName: req.body.fName,
        lName: req.body.lName,
      }
    )
    res.status(200).json("Post has been updated");
  } catch (error) {
    res.status(401).json("Post could'nt be updated");
  }
});

app.listen("3001", () => {
  console.log("App is running in Localhost 3001");
});
