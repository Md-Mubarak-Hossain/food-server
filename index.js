const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
// const recipes=require("recipes.json()")
const port = process.env.PORT || 5001;
require('dotenv').config();

app.use(cors())
app.use(express.json())
// app.get('/foods', (req, res) => {
//     res.send(recipes)
// })
app.get('/', (req, res) => {
    res.send(`BenZen Food recipes server run`)
})
app.listen(port, () => {
    console.log('BenZen Food recipes server port', port)
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@librarycluster.iklz7tv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("BeZenFoodRecipes");
        const recipeCollection = database.collection("recipes");
        const bookingCollection = database.collection("booking");
        const userCollection = database.collection("users");

        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.get("/users", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/users', async (req, res) => {
            const file = req.body;
            const result = await userCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/users/:id', async (req, res) => {
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

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        app.get("/recipes", async (req, res) => {
            const query = {};
            const cursor = recipeCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/recipes/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await recipeCollection.findOne(query);
            res.send(result);
        })

        app.get("/recipeEmail/:email", async (req, res) => {
            const query = { email: req.params.email };
            const result = await recipeCollection.findOne(query);
            res.send(result);
        })

        app.post('/recipes', async (req, res) => {
            const file = req.body;
            const result = await recipeCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/recipes/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateRecipes = req.body;
            const updateDoc = {
                $set: {
                    name: updateRecipes.name,
                    price: updateRecipes.price,
                    description: updateRecipes.description

                }
            }
            const result = await recipeCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/recipes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await recipeCollection.deleteOne(query);
            res.send(result);
        })
        app.get("/orders", async (req, res) => {
            const query = {};
            const cursor = bookingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.findOne(query);
            res.send(result);
        })

        app.get("/orderEmail/:email", async (req, res) => {
            const query = { email: req.params.email };
            const result = await bookingCollection.findOne(query);
            res.send(result);
        })

        app.post('/orders', async (req, res) => {
            const file = req.body;
            const result = await bookingCollection.insertOne(file);
            res.send(result);
        })

        app.patch('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateorders = req.body;
            const updateDoc = {
                $set: {
                    name: updateorders.name,
                    price: updateorders.price,
                    description: updateorders.description

                }
            }
            const result = await bookingCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // ....
    }
}
run().catch(err => console.error(err))