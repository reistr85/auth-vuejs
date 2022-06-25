import { faker } from '@faker-js/faker';

export default (server) => {
  server.create('user', {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: '12345678',
    situation: 'active',
    created_at: '2022-06-10 00:00:00',
    updated_at: '2022-06-10 00:00:00',
    deleted_at: null,
  });
  server.createList('user', 5);
};

export const factory = {
  name() { return faker.internet.userName(); },
  email() { return faker.internet.email(); },
  password() { return faker.internet.password(); },
  situation() { return 'active'; },
  created_at() { return faker.date.past(); },
  updated_at() { return faker.date.past(); },
  deleted_at() { return null; },
};
