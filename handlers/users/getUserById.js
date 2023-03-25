import db from "../../configs/dbconfig.js"
import logger from "../../configs/logconfig.js"

function daoGetUserByID(id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, user_name, created_at as res FROM users where id=${id}`, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result[0]);
        });
    });
}

export function getUserById(req, resp, next) {
    daoGetUserByID(req.params.id)
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