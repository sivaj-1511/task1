import bodyParser from "body-parser"

import { getstats } from "./stats.js"
import { postlogin } from "./login.js"
import { authenticateToken } from "./accesstoken.js"

//CRUD import
import {getAllUsers} from "./users/getAllUsers.js"
import {getUserById} from "./users/getUserById.js"
import {createUser} from "./users/createUser.js"
import {updateUser} from "./users/updateUser.js"
import {deleteuser} from "./users/deleteuser.js"




const jsonParser = bodyParser.json()

export function addRoutes(app) {
    // Login routes
    app.post('/login', jsonParser, postlogin); 

    // Statistics routes
    app.get('/stats', authenticateToken, getstats);

    // User CRUD routes
    app.get('/user', authenticateToken, getAllUsers);
    app.get('/user/:id', authenticateToken, getUserById);
    app.post('/user', authenticateToken, jsonParser, createUser);
    app.patch('/user/:id', authenticateToken,jsonParser, updateUser);
    app.delete('/user/:id', authenticateToken, deleteuser);

}