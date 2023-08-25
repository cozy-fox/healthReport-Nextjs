import jwt from 'jsonwebtoken';
import config from "./../../../global.config";
import User from "../model/user";

const withAuth = (handler) => {
    return (req, res) => {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: 'No credentials sent!' });
        }
        const token = req.headers.authorization;
        jwt.verify(token.slice(7), config.secret, async (err, decoded) => {
            if (err) {
              return res.status(401).send({ message: "Unauthorized!" });
            }
            
            const user = await User.findById(decoded.id).exec();
            if (user.allowed === true) {
                return handler(req, res);
            } else {
              return res.status(403).send({ message: 'You are not allowed!' });
            }
          });

        
    };
};

export default withAuth;