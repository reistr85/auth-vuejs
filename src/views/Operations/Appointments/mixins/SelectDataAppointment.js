export default (type) => ({
  methods: {
    selectDataAppointment(params) {
      
      let { data } = params;

      if(params.autoComplete) {
        data = this[`${type}s`].data.filter((item) => {
          return item.id === data
        })
      }

      data.length ? this.disabledBtnNext = false : this.disabledBtnNext = true;
      
      this.$emit('selectDataAppointment', { data, type })
    },
    getItemsAutoComplete(search) {
      const options = {
        search,
        autoComplete: true,
      }
      this.$emit('getItems', { ...options, type });
    }
  }
})