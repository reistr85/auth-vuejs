<template>
  <Dialog :dialog="dialog" :maxWidth="parseInt(1000)" no-title no-actions>
    <div slot="content">
      <component :is="typesComponents[type]" v-bind="propsComponents" @cancel="cancel" />
    </div>
  </Dialog>
</template>

<script>
import eventBus from '@/utils/eventBus';
import Dialog from '@/components/vuetify/Dialog';

const typesComponents = {};

export default {
  name: 'QuickMenu',
  components: { Dialog },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    type: {
      required: true,
    }
  },
  computed: {
    propsComponents() {
      return  {
        ...this.type === 'appointment' && { ref: 'wizardAppointment' },
        ...this.type === 'calendar' && { ref: 'wizardCalendar' },
      };
    },
  },
  data() {
    return {
      typesComponents: typesComponents,
    };
  },
  methods: {
    cancel() {
      eventBus.$emit('handleQuickMenu', { type: null });
    }
  }
};
</script>

<style>

</style>