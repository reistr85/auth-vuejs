<template>
  <div>
    <PageHeader :schema="schema" />
    <PageContent />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import CalendarSchema from '../schemas/CalendarSchema';
import CalendarsService from '../services/CalendarsService';

export default {
  name: 'ListCalendars',
  components: { PageHeader, PageContent },
  data() {
    return {
      schema: CalendarSchema,
      service: CalendarsService,
    }
  },
}
</script>