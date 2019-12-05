import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default (req, res, next) => {
  const { authorization } = req.headers;

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, auth.secret, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Unauthorized' });

      req.userId = decoded.id;
    });

    return next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Unexpected failure, please try again' });
  }
};
