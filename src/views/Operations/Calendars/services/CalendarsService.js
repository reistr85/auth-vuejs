import DynamicService from '@/service/DynamicService';

const formatResponse = () => {
};

const CalendarService = DynamicService('calendars', {
  formatResponse,
});

export default CalendarService;