const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");

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

client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(port, () => {
  console.log(`TODOser is running on port ${port}`);
});
