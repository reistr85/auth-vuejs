import { faker } from '@faker-js/faker';

export default (server) => {
  server.create('register', {
    name: 'latin Uyshe',
    email: 'Latin@mail.com',
    cell_phone: '84988481941',
    type: 'customer',
    situation: 'active',
    created_at: '2022-06-10 00:00:00',
    updated_at: '2022-06-10 00:00:00',
    deleted_at: null,
  });
  server.createList('register', 10);
};

export const factoryRegisters = {
  name() { return faker.internet.userName(); },
  email() { return faker.internet.email(); },
  cell_phone() { return faker.helpers.arrayElement(['84988481941', '84988525655', '8499856545', '8486952635']); },
  type() { return faker.helpers.arrayElement(['customer', 'agent', 'indication']); },
  situation() { return 'active'; },
  created_at() { return faker.date.past(); },
  updated_at() { return faker.date.past(); },
  deleted_at() { return null; },
};
