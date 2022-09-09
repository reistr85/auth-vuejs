import { createServer, Model, Factory } from 'miragejs';
import users, { factoryUsers } from './seeds/users';
import allTypes from './seeds/allTypes';
import registers, { factoryRegisters } from './seeds/registers';
import usersRoutes from './routes/users/';
import authRoutes from './routes/auth';
import allTypesRoutes from './routes/allTypes/';
import registersRoutes from './routes/registers/';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      allType: Model,
      register: Model,
    },

    factories: {
      user: Factory.extend(factoryUsers),
      register: Factory.extend(factoryRegisters),
    },

    seeds(server) {
      users(server);
      allTypes(server);
      registers(server);
    },

    routes() {
      this.namespace = '/api/v1';
      authRoutes(this);
      usersRoutes(this);
      allTypesRoutes(this);
      registersRoutes(this);
    },
  });

  return server;
}