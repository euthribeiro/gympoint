import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import SessionsController from '../app/controllers/SessionsController';
import StudentsController from '../app/controllers/StudentsController';
import auth from '../app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  console.log('teste');
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionsController.store);

routes.use(auth);

routes.post('/students', StudentsController.store);

export default routes;
