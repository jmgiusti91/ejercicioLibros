const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const RouterLibro = require('./routers/RouterLibro');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/api/libros', RouterLibro);

mongoose.connect('mongodb://localhost:27017/ejercicioLibros', { useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
    console.log('Error: ', err);
});

mongoose.connection.on('connected', () => {
    app.listen(3000, () => {
        console.log('API corriendo en el puerto 3000');
    });
});

module.exports = app;

