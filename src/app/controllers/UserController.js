import * as Yup from 'yup';
import user from '../models/user';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
        .min(1),
      password: Yup.string()
        .required()
        .min(6),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { name, email, password } = req.body;

    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const userC = await user.create({ name, email, password });

    const { id } = userC;

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
