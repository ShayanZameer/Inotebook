const connectToMongo = require('./db');
var express = require('express');
var cors = require ('cors');


connectToMongo();

const port = 5000;

var app = express();
app.use(cors())

app.use(express.json());
// Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


const server = app.listen(port, () => {
    console.log(`iNoteBook app listening at http://localhost:${port}`);
  });










