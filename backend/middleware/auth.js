const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      req.auth = { userId };  
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User ID non valable';
      } else {
        next();
      }
    } catch {
      res.status(401).json({ error: new Error('Requête non authentifiée!')});
   }
};