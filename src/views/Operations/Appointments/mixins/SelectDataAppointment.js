export default (type) => ({
  methods: {
    selectDataAppointment(params) {
      let { data } = params;

      if(params.autoComplete) {
        let ids = data;
        if(!params.data.length)
          ids = [data]

        data = ids.map((id) => {
          return this[`${type}s`].data.find((item) => {
            return item.id === id
          })
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