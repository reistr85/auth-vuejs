/* eslint-disable no-unused-vars */

const TYPES = Object.freeze({
  'categorias': 'category',
  'sub-categorias': 'sub-category',
  'pagamentos': 'payment-method',
  'bandeiras': 'card-flags',
});

export default {
  beforeList: (formValue) => {
  },
  beforeSave: (formValue) => {
    formValue.type = TYPES[window.location.href.split('/')[3]]
  },
  changes: {
  },
}