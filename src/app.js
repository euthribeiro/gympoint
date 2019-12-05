import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middleWares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middleWares() {
    this.server.use(express.json());
  }
}

export default new App().server;
