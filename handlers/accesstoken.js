import  jwt from "jsonwebtoken"
import HttpStatus from "http-status-codes"

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(HttpStatus.UNAUTHORIZED)
  
    jwt.verify(token, "my-top-secret", (err, user) => {
  
      if (err) return res.sendStatus(HttpStatus.FORBIDDEN)
  
      req.user = user
  
      next()
    })
}

