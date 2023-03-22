import md5 from "md5";

import db from "../configs/dbconfig.js"
import logger from "../configs/logconfig.js"

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
