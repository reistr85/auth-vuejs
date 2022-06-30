import { createServer, Model, Factory } from 'miragejs';
import users, { factory } from './seeds/users';
import allTypes from './seeds/allTypes';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import allTypesRoutes from './routes/allTypes';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      allType: Model,
    },

    factories: {
      user: Factory.extend(factory),
    },

    seeds(server) {
      users(server);
      allTypes(server);
    },

    routes() {
      this.namespace = '/api/v1';
      authRoutes(this);
      usersRoutes(this);
      allTypesRoutes(this);
    },
  });

  return server;
}