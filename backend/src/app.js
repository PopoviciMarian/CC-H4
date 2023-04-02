const express = require('express');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const config = require('./module/config');

const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use('/', routes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        success: false,
        message: 'Request has failed',
        error: {
            statusCode: statusCode,
            message: err.message,
        },
    });
})

app.listen(config.port, () => console.log(`Backend service listening on port ${config.port}!`));