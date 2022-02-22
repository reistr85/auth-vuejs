import RegistersService from '@/views/Registers/Registers/services/RegistersService';
import OrderServicesService from '@/views/Operations/OrderServices/services/OrderServicesService';
import ServicesService from '@/views/Registers/Services/services/ServicesService';

const services = Object.freeze({
  orderServicesService: OrderServicesService,
  registersService: RegistersService,
  servicesService: ServicesService,
});

export default {
  install: function (Vue) {
    Object.keys(services).forEach((key) => {
      Vue.prototype[key] = services[key]
      Vue[key] = services[key]
    });
  }
}