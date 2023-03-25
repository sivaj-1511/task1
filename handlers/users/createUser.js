import db from "../../configs/dbconfig.js"
import logger from "../../configs/logconfig.js"

function daoCreateUser(userObj) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO users (user_name, pass) VALUES
            ('${userObj.name}', md5('${userObj.password}'))`, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

export function createUser(req, resp, next) {
    daoCreateUser(req.body)
        .then((data)=>{
            daoGetUserByID(data.insertId)
            .then((data)=>{
                resp.status(200).send(data)
            })
            .catch((err) => setImmediate(
                () => {
                    logger.error(err) 
                    resp.status(500).send() 
                }
            ))
        })
        .catch((err) => setImmediate(
            () => {
                logger.error(err) 
                resp.status(500).send() 
            }
        ))
}