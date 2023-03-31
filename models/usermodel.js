import { Sequelize, DataTypes } from "sequelize"

let sq = new Sequelize('stats', 'nodeuser', 'Master#123', {
    host: 'localhost',
    dialect:'mysql'
})

const UserModel = sq.define('User', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING
    },
    pass: {
        type: DataTypes.STRING 
    },
    created_at: {
        type: DataTypes.DATE
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  export default UserModel;



