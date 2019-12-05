import * as Yup from 'yup';
import Students from '../models/students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const studentExist = await Students.findOne({ where: { email } });

    if (studentExist) {
      return res.status(400).json({ error: 'Students already exists' });
    }

    const { name, age, weight, height } = req.body;

    const stud = await Students.create({ name, email, age, weight, height });

    return res.json({ stud });
  }
}

export default new StudentsController();
