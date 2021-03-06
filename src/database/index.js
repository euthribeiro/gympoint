import Sequelize from 'sequelize';
import databaseConfig from '../configs/database';
import User from '../app/models/user';
import Student from '../app/models/students';

const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
