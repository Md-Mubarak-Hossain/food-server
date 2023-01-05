const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send(`server run on ${port}`)
})
app.listen(port, () => {
    console.log('port', port)
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@librarycluster.iklz7tv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("OnlineLibrary");
        const bookCollection = database.collection("books");
        const userCollection = database.collection("user");

        app.get("/creator/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.get("/creator", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/creator', async (req, res) => {
            const file = req.body;
            const result = await userCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/creator/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateFile = req.body;
            const updateDoc = {
                $set: {
                    email: updateFile.email,
                    password: updateFile.password,

                }
            }
            const result = await userCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/creator/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        app.get("/paper", async (req, res) => {
            const query = {};
            const cursor = bookCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/paper/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bookCollection.findOne(query);
            res.send(result);
        })

        app.get("/bookEmail/:email", async (req, res) => {
            const query = { email: req.params.email };
            const result = await bookCollection.findOne(query);
            res.send(result);
        })

        app.post('/paper', async (req, res) => {
            const file = req.body;
            const result = await bookCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/paper/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateFile = req.body;
            const updateDoc = {
                $set: {
                    name: updateFile.name,
                    url: updateFile.url,
                    writer: updateFile.writer

                }
            }
            const result = await bookCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/paper/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // ....
    }
}
run().catch(err => console.error(err))