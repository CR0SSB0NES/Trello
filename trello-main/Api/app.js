const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

app.get('/login', (req, res) => {
    res.send("Hi from backend")
})

app.post('/login', (req, res) => {
    
})

app.patch('/login', (req, res) => {
    
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})