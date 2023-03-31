// import db from "../configs/dbconfig.js"
// import logger from "../configs/logconfig.js";
import UserModel from "../models/usermodel.js";

import md5 from "md5";

let user = {
    daoGetAllUser: () => {
        return UserModel.findAll();
    },

    daoGetUserByID : (id) => {
        return UserModel.findByPk(id);
    },

    daoCreateUser: (userObj) => {
        return UserModel.create({ 
            user_name: userObj.name,
            pass: md5(userObj.password) 
        })
    },

    daoUpdateUser : (id, oldpassword, newpassword) => {
        return UserModel.update({pass : md5(newpassword)}, {
            where: {
                id : id,
                pass : md5(oldpassword)
            }
        })
    },

    daoDeleteUser: (id) => {
        return UserModel.destroy({where: {id: id}})
    }
};

export default user;
