'use strict';

const express = require('express');
const axios = require('axios').default;

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
    axios.get('web')
  .then(function (response) {
    // handle success
    res.send(`Hello world\nFrom service: ${response.data.message}`);
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);