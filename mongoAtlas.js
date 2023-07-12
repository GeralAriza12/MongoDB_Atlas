const express = require('express');
const app = express();

const env = require('dotenv');
env.config();



app.listen(3000, () => {
    console.log("Servidor corriendo");
})