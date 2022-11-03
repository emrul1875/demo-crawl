const express = require('express')
const app = express()
const port = 3040

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

const logger = require("./logger");
logger.log("info", `Testing couldwatch log file from ec2 server`);

app.listen(port, () => {
    console.log("server started at port " + port);
});