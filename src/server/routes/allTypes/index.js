import { getAll } from './getAll';
import { create } from './create';
import { show } from './show';
import { update } from './update';
import { destroy } from './destroy';

export default (server) => {
  getAll(server);
  create(server);
  show(server);
  update(server);
  destroy(server);
};
