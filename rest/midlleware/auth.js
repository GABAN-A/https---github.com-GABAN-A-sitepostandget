const jwt = require('jsonwebtoken');
const config = require('config');
 
module.exports = (req, res, next) => {
    console.log("these is",req.header('x-auth-token'))
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
 
  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));
    req.user = decoded;
    
    next();
  }
  catch (ex) {
      console.log('invalid')
    res.status(400).send('Invalid token.');
    
  }
}