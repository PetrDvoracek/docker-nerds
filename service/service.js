'use strict';

const express = require('express');

// Constants
const PORT = 80;  //inside container
const HOST = '0.0.0.0'; //inside container, IF 127.0.0.1 THEN NOT VISIBLE OUTSIDE CONTAINER! 

// App
const app = express();
app.get('/', (req, res) => {
    const data = {
        message: 'This is response from service!'
    }
    res.send(data);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);