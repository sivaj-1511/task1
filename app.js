import express from "express"
import logger from "./configs/logconfig.js"

import { addRoutes } from "./handlers/routes.js"

const port = 8080
var app = express()

//Add Routes
addRoutes(app)

logger.error("This is a fake error!")
//Start the add
app.listen(port, err => {
    if (err) logger.error(`Problem starting the server`)
    logger.info(`Server listening on Port ${port}`);
})





