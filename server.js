const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const Model = require("./models/Model");
env.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.post("/add", (req, res) => {
  const task = req.body.task;
  Model.create({
    task: task,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/get", (req, res) => {
  Model.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Model.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "Task deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error deleting task" });
    });
});


app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}!`);
});
