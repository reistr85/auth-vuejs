import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import OrdderServicesService from '@/views/Operations/OrderServices/services/OrderServicesService';

const services = Object.freeze({
  orderServicesService: OrdderServicesService,
  registersService: RegistersService,
});

export default {
  install: function (Vue) {
    Object.keys(services).forEach((key) => {
      Vue.prototype[key] = services[key]
      Vue[key] = services[key]
    });
    
  }
}