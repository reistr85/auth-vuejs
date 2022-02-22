import OrderServiceSchema from '@/views/Operations/OrderServices/schemas/OrderServiceSchema';

const schemas = Object.freeze({
  orderServiceSchema: OrderServiceSchema,
});

export default {
  install: function (Vue) {
    Object.keys(schemas).forEach((key) => {
      Vue.prototype[key] = schemas[key]
      Vue[key] = schemas[key]
    });
  }
}