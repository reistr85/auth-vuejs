<template>
  <div>
    <PageHeader :schema="$schemas.calendar" />
    <PageContent>
      <MyCalendar />
    </PageContent>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import PageContent from '@/components/PageContent';
import MyCalendar from '../components/MyCalendar/MyCalendar';


export default {
  name: 'ListCalendars',
  components: { PageHeader, PageContent, MyCalendar },
  data() {
    return {
    };
  },
};
</script>