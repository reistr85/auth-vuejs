import { faker } from '@faker-js/faker';
import { baseFields } from '../utils//baseFields';

export default (server) => {
  server.create('user', {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: '12345678',
    type: 'admin',
    ...baseFields,
  });
  server.createList('user', 30);
};

export const factoryUsers = {
  name() { return faker.internet.userName(); },
  email() { return faker.internet.email(); },
  password() { return faker.internet.password(); },
  type() { return 'manager'; },
  situation() { return 'active'; },
  created_at() { return faker.date.past(); },
  updated_at() { return faker.date.past(); },
  deleted_at() { return null; },
};
