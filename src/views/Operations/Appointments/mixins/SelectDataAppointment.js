export default (type) => ({
  methods: {
    selectDataAppointment(params) {
      let { data } = params;

      if(params.autoComplete) {
        data = this.customers.data.filter((item) => {
          return item.id === data
        })
      }

      data.length ? this.disabledBtnNext = false : this.disabledBtnNext = true;
      this.$emit('selectDataAppointment', { data: data, type: type })
    },
  }
})