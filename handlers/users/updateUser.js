
import db from "../../configs/dbconfig.js"
import logger from "../../configs/logconfig.js"
function daoUpdateUser(oldpassword, newpassword, id) {
    return new Promise((resolve, reject) => {
        let q = `UPDATE users SET pass = md5('${newpassword}') WHERE id = ${id} AND pass=md5('${oldpassword}')`;
        db.query(q, 
        (err, result, fields) => {
            if (err) {
                reject(err);
            }
            if (result.affectedRows == 0) {
                reject(new Error("Invalid old password"));
            }
            resolve(result);
        });
    });
}


export function updateUser(req, resp, next) {
    
    daoUpdateUser(req.body.oldpassword, req.body.newpassword, req.params.id).then((data)=>{
            resp.status(200).send("Successfully updated user password")
        })
        .catch((err) => setImmediate(
            () => {
                logger.error(err) 
                resp.status(400).send() 
            }
        ))
}