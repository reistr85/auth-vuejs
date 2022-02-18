import DynamicService from '@/service/DynamicService';

const formatResponse = (item) => {
  item
}

const CalendarService = DynamicService('calendars', {
  formatResponse,
});

export default CalendarService;