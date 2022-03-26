/* eslint-disable no-unused-vars */
import CreateAllType from '../locales/pt-BR/allTypes/CreateAllType';

const getTypeURL = () => {
  return window.location.href.split('/')[3];
};

export default {
  beforeList: (formValue) => {
  },
  beforeSave: (formValue) => {
    const { typeURLPt } = CreateAllType;
    formValue.type = typeURLPt[getTypeURL()];
  },
  changes: {
  },
};