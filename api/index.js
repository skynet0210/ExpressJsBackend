const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');


const { logErrors, errorHandler, boomerrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

const whitelist = ['http://localhost:3000/api/v1', 'http:localhost:5500', 'https://myapp.com', 'http://127.0.0.1:5500'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('url no permitido'));
        }
    }
};
//app.use(cors(options));

app.get('/api', (req, res) => {
    res.send('Hola server express');
});

app.get('/api/nueva-ruta', (req, res) => {
    res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomerrorHandler);
app.use(errorHandler);


app.listen(port, () => {
    console.log('Mi puerto' + port);
});
