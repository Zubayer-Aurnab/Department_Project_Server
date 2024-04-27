const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://10th_psychology:wMb2mUkZUrDtM2wF@cluster0.2dfdg2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const AllStudents = client.db("10th_psychology").collection("students");

    app.post("/all-students", async (req, res) => {
      const { data } = req.body;
      try {
        const result = await AllStudents.insertOne(data);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });

    app.get("/all-students-get", async (req, res) => {
      try {
        const query = {};
        const result = await AllStudents.find(query).toArray();
        res.send(result);
      } catch (error) {}
    });

    app.get("/all-students-get/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const query = { _id: new ObjectId(id) };
        const result = await AllStudents.findOne(query);
        res.send(result);
      } catch (error) {
        console.log(error);
      }
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("10th Psychology server is running .....");
});

app.listen(port, () => {
  console.log(`server is on port: ${port}------------------->`);
});
