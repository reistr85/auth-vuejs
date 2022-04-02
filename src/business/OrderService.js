/* eslint-disable no-unused-vars */
import { orderServiceStatus } from '@/utils/enums';

const setDestroyDisabled = (items) => {
  items.forEach((item) => {
    if (item.status === orderServiceStatus.FINISHED) {
      item.destroyDisabled = true;
    }
  });
};

export default {
  beforeList: (formValue) => {
    const { data } = formValue;
    setDestroyDisabled(data);
  },
  beforeForm: (formValue, fields) => {
  },
  changes: {
  },
};