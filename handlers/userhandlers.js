import logger from "../configs/logconfig.js"

import user from "../repo/userrepo.js"

import HttpStatus from "http-status-codes"


let daoUser = {
    createUser: (req, resp, next) => {
        user.daoCreateUser(req.body)
            .then((data)=>{
                logger.debug(JSON.stringify(data, null, 4));
                resp.status(HttpStatus.CREATED).send(data)
            }).catch(
                (err) => setImmediate(
                    () => {
                        logger.error(err) 
                        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
                    }
                )
            );
    },

    deleteuser: (req, resp, next) => {
        user.daoDeleteUser(req.params.id)
            .then((data)=>{
                logger.debug(data.toString())
                if (data) {
                    resp.status(HttpStatus.NO_CONTENT).send()
                } else {
                    resp.status(HttpStatus.NOT_FOUND).send("User Not Found")
                }
            }).catch((err) => setImmediate(
                () => {
                    logger.error(err) 
                    resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
                }
            ))
    },

    getAllUsers: (req, resp, next) => {
        user.daoGetAllUser().then((data) => {
            resp.status(HttpStatus.OK).send(data)    
        }).catch((err) => {
            logger.error(err)
        })
    },

    getUserById: (req, resp, next) => {
        user.daoGetUserByID(req.params.id)
            .then((data)=>{
                resp.status(HttpStatus.OK).send(data)
            })
            .catch((err) => setImmediate(
                () => {
                    logger.error(err) 
                    resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
                }
            ))
    },

    updateUser: (req, resp, next) => {
        user.daoUpdateUser(req.params.id, req.body.oldpassword, req.body.newpassword).then((data)=>{
                if (data > 0) {
                    resp.status(HttpStatus.OK).send("Successfully updated user password")
                } else {
                    resp.status(HttpStatus.NOT_FOUND).send("Wrong Old password")
                }
            })
            .catch((err) => setImmediate(
                () => {
                    logger.error(err) 
                    resp.status(HttpStatus.BAD_REQUEST).send() 
                }
            ))
    }

}

export default daoUser;
