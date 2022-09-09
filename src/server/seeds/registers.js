import { faker } from '@faker-js/faker';
import { baseFields } from '../utils//baseFields';

export default (server) => {
  server.create('register', {
    name: 'latin Uyshe',
    email: 'Latin@mail.com',
    cell_phone: '84988481941',
    type: 'customer',
    ...baseFields,
  });
  server.createList('register', 10);
};

export const factoryRegisters = {
  name() { return faker.internet.userName(); },
  email() { return faker.internet.email(); },
  cell_phone() { return faker.helpers.arrayElement(['84988481941', '84988525655', '8499856545', '8486952635']); },
  type() { return faker.helpers.arrayElement(['customer', 'employee', 'provider']); },
  situation() { return 'active'; },
  created_at() { return faker.date.past(); },
  updated_at() { return faker.date.past(); },
  deleted_at() { return null; },
};
