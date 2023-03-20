import bodyParser from "body-parser"

import { getstats } from "./stats.js"
import { postlogin } from "./login.js"
import { authenticateToken } from "./accesstoken.js"

const jsonParser = bodyParser.json()

export function addRoutes(app) {
    app.post('/login', jsonParser, postlogin) 
    app.get('/stats', authenticateToken, getstats)
}