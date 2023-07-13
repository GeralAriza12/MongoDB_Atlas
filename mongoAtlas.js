const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
app.use(express.json());

const env = require('dotenv');

env.config();

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
// useNewUrlParse -> entiende que dentro de esa url esta pasando el usuario y contraseña
    useNewUrlParser: true,
});

app.get('/', async (req, res) => {
    try {
        await client.connect();
        res.status(201).send({
          menssage: "Bienvenido a tu lista de tareas"  
        })
    } catch (error) {
        res.status(404).send({error});
    }
})

const db = client.db('todo_list');
const collection = db.collection('home-task');

app.post('/create', async (req, res) => {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        res.status(401).send({
            menssage: "Campos requeridos no completados"
        });
    } else {
        const newTask = {
            title,
            description,
            priority,
            completed: false
        }
        await client.connect();
        const doc = await collection.insertOne(newTask);

        res.status(200).send(doc);
    }
})

app.get('/read', async (req, res) => {
    try {
        await client.connect();
        const doc = await collection.find().toArray();

        res.status(200).send(doc);
    } catch (error) {
        res.status(404).send({error});
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        await client.connect();
        
        const taskId = req.params.id;
        const taskBody = req.body

        const updateTask = await collection.updateOne(
            {_id: new ObjectId(taskId)}, 
            {$set: taskBody}
        )

        if (updateTask.modifiedCount > 0) {
            res.status(200).send(updateTask);
        } else {
            res.status(404).send({
                message: "Tarea no encontrada"
            });
        }  
    } catch (error) {
        res.status(500).send({ error });
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        await client.connect();
        const taskId = req.params.id;

        const deleteTask = await collection.deleteOne({_id: new ObjectId(taskId)})

        if (deleteTask.deletedCount > 0) {
            res.status(200).send(deleteTask);
        } else {
            res.status(404).send({
                message: "Tarea no encontrada"
            });
        }
    } catch (error) {
        res.status(500).send({ error });
    }

})

app.listen(3000, () => {
    console.log("Servidor corriendo");
})