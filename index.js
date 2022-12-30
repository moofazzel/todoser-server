const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

const app = express();

// Middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TODOser IS RUNNING");
});

const uri =
  "mongodb+srv://todoser:VupXSdN0se3SU4CF@cluster0.ia0tdiq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.log(error.name, error.massage);
  }
}

dbConnect();

// All Database Collection
const allTasks = client.db("todoser").collection("tasks");

// INSERT TASK DATA TO MONGODB
try {
  app.post("/add_task", async (req, res) => {
    const task = req.body;
    const result = await allTasks.insertOne(task);
    res.send(result);
  });
} catch (error) {
  console.log("allTasks", error.name, error.massage, error.stack);
}

// Get task info
try {
  app.get("/all_tasks", async (req, res) => {
    const query = {};
    const result = await allTasks.find(query).toArray();
    res.send(result);
  });
} catch (error) {
  console.log("Get all tasks", error.name, error.massage, error.stack);
}

// update task
try {
  app.put("/task/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = { _id: ObjectId(id) };
    const option = { upsert: true };
    const updateDoc = {
      $set: {
        status: true,
      },
    };
    const result = await allTasks.updateOne(filter, updateDoc, option);
    res.send(result);
  });
} catch (error) {
  console.log("Put User", error.name, error.massage, error.stack);
}

// delete a task
try {
  app.delete("/task/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const filter = { _id: ObjectId(id) };
    const result = await allTasks.deleteOne(filter);
    res.send(result);
  });
} catch (error) {
  console.log("Delete product", error.name, error.massage, error.stack);
}

app.listen(port, () => {
  console.log(`TODOser is running on port ${port}`);
});
