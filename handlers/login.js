import  jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid";
import HttpStatus from "http-status-codes"
import  sequelize from "sequelize"
import md5 from "md5";


import logger from "../configs/logconfig.js"
import UserModel from "../models/usermodel.js";

function generateAccessToken(username) {
    return jwt.sign({username:username}, "my-top-secret", { expiresIn: '1800s' });
}

function authenticateuser(userobj) { 
    return UserModel.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('*')), "res"],
        ],
        where: {
            user_name: userobj.username,
            pass: md5(userobj.password)
        }
    })
}

export function postlogin (req, res, next) {
    authenticateuser(req.body).then((dbres)=>{
        logger.debug(JSON.stringify(dbres));
        if (dbres.values(1)) {
            logger.info("User Found. Authenticating")
            let token = generateAccessToken(req.body.username);
            res.status(HttpStatus.OK)
            res.setHeader("content-type", "application/json");
            res.setHeader("x-request-id", uuidv4());
            res.send({"access-token":token});
        } else {
            logger.error("User name or password not matching")
            res.status(HttpStatus.UNAUTHORIZED).send()
        };
    }).catch((err) => setImmediate(
            () => {
                logger.error(err) 
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send() 
            }
        )
    );
}