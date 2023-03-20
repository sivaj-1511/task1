import  mysql from "mysql"
const db = mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'Master#123',
    database: 'stats',
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true
})
export default db;