import  jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';

import db from "../configs/dbconfig.js"
import logger from "../configs/logconfig.js"

function generateAccessToken(username) {
    return jwt.sign({username:username}, "my-top-secret", { expiresIn: '1800s' });
}

function authenticateuser(userobj) { 
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as res FROM users where user_name='${userobj.username}' and pass=md5('${userobj.password}')`, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result[0].res);
        });
    });
}

export function postlogin (req, res, next) {
    authenticateuser(req.body).then((dbres)=>{
        if (dbres >0) {
            logger.info("User Found. Authenticating")
            let token = generateAccessToken(req.body.username);
            res.status(200)
            res.setHeader("content-type", "application/json");
            res.setHeader("x-request-id", uuidv4());
            res.send({"access-token":token});
        } else {
            logger.error("User name or password not matching")
            res.status(401).send()
        };
    }).catch((err) => setImmediate(
            () => {
                logger.error(err) 
                res.status(500).send() 
            }
        )
    );
}
