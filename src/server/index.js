import { createServer, Model, Factory } from 'miragejs';
import users, { factory } from './seeds/users';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend(factory)
    },

    seeds(server) {
      users(server);
    },

    routes() {
      this.namespace = 'api/v1';
      authRoutes(this);
      usersRoutes(this);
    },
  });

  return server;
}