const express = require('express');
const { ObjectId } = require('mongodb');
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

env.config();
// No rechaza peticiones con cors
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

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

// Merch con Fron my-react-task-list
app.post('/create', async (req, res) => {
    const { name, description } = req.body;
    await client.connect();
    if (!name) {
        res.status(404).send({
            menssage: "Campos requeridos no completados"
        });
    } else {
        const newTask = {
            name,
            description,
            checked: false
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
        res.status(500).send({ 
            message: "Error al eliminar la tarea",
            error: error
        });
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        await client.connect();
        
        const taskId = req.params.id;
        const taskBody = req.body;
        console.log(taskBody);

        const updateTask = await collection.updateOne(
            {_id: new ObjectId(taskId)}, 
            {$set: taskBody}
        )

        if (updateTask.modifiedCount > 0) {
            res.status(200).send(updateTask);
        } else {
            res.status(404).send({
                message: "No hay modificaciones"
            });
        }  
    } catch (error) {
        res.status(500).send({ 
            message: "Error al editar la tarea",
            error: error
         });
    }
})

app.listen(3000, () => {
    console.log("Servidor corriendo");
})