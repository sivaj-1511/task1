import bodyParser from "body-parser"

import { getstats } from "./stats.js"
import { postlogin } from "./login.js"
import { authenticateToken } from "./accesstoken.js"

//CRUD import
import daoUser from "./userhandlers.js"

const jsonParser = bodyParser.json()

export function addRoutes(app) {
    // Add Json Parser Middleware
    app.use(jsonParser)

    // Unprotected login endpoint
    app.post('/login', postlogin); 
    
    // Protect with JWT Tokens
    app.use(authenticateToken)
    // Statistics routes
    app.get('/stats', getstats);

    // User CRUD routes
    app.get('/user', daoUser.getAllUsers);
    app.get('/user/:id', daoUser.getUserById);
    app.post('/user', daoUser.createUser);
    app.patch('/user/:id', daoUser.updateUser);
    app.delete('/user/:id', daoUser.deleteuser);

}