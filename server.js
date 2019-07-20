const express = require('express');
const routes = require('./server/routes/index');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(routes);

app.listen( PORT, () => {
    console.log(`Server is up at port ${PORT}`);
});

module.exports = app;