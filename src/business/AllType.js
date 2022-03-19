/* eslint-disable no-unused-vars */
import { typeAllType } from '@/utils/enums';

export default {
  beforeList: (formValue) => {
  },
  beforeSave: (formValue) => {
    formValue.type = typeAllType[window.location.href.split('/')[3]];
  },
  changes: {
  },
};