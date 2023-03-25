import db from "../../configs/dbconfig.js"
import logger from "../../configs/logconfig.js"

function daoDeleteUser(id) {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM users WHERE id=${id}`, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

export function deleteuser(req, resp, next) {
    daoDeleteUser(req.params.id)
        .then((data)=>{
            resp.status(204).send(data)
        })
        .catch((err) => setImmediate(
            () => {
                logger.error(err) 
                resp.status(500).send() 
            }
        ))
}