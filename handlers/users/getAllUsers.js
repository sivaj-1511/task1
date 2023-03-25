import db from "../../configs/dbconfig.js"
import logger from "../../configs/logconfig.js"

function daoGetAllUser() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, user_name, created_at as res FROM users`, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}


export function getAllUsers(req, resp, next) {
    daoGetAllUser()
        .then((data)=>{
            resp.status(200).send(data)
        })
        .catch((err) => setImmediate(
            () => {
                logger.error(err) 
                resp.status(500).send() 
            }
        ))
}