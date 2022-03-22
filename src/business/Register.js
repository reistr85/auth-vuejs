/* eslint-disable no-unused-vars */
import { typePerson } from '@/utils/enums';

const FIELD_PF = ['birth', 'cpf', 'facebook', 'instagram', 'twitter'];
const FIELD_PJ = ['cnpj', 'social_name', 'ie', 'site'];

const setDisabled = (formValue, fields) => {
  if(formValue.type_person === typePerson.PF) {
    fields[0].items.forEach((i) => {
      if(FIELD_PJ.includes(i.name)) {
        formValue[i.name] = null;
        i.disabled = true;
      }

      if(FIELD_PF.includes(i.name)) i.disabled = false;
    });
  }else{
    fields[0].items.forEach((i) => {
      if(FIELD_PF.includes(i.name)) {
        formValue[i.name] = null;
        i.disabled = true;
      }

      if(FIELD_PJ.includes(i.name)) i.disabled = false;
    });
  }
};

export default {
  beforeList: (formValue) => {
  },
  beforeForm: (formValue, fields) => {
    setDisabled(formValue, fields);
  },
  changes: {
    type_person: (formValue, fields, item) => {
      setDisabled(formValue, fields);
    }
  },
};