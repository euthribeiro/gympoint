import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id } = user;

    const token = jwt.sign({ id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    return res.json({
      id,
      email,
      token,
    });
  }
}

export default new SessionController();
