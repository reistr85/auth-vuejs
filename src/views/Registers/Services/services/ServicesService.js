import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item.category_formatted = item.category.description;
  item.sub_category_formatted = item.sub_category.description;
}

const ServicesService = DynamicService('services', {
  formatResponse,
});

export default ServicesService;