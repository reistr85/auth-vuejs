export default (type) => ({
  methods: {
    selectDataAppointment(data) {
      data.length ? this.disabledBtnNext = false : this.disabledBtnNext = true;
      this.$emit('selectDataAppointment', { data: data, type: type })
    },
  }
})