<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="(group, iGroup) in schema.fields" :key="iGroup">
        <v-expansion-panel-header>
          <h3><Icon :icon="group.icon" class="mr-3" /> {{ group.title }}</h3>
        </v-expansion-panel-header>

        <v-expansion-panel-content v-if="!group.address">
          <v-form v-model="valid" ref='form' lazy-validation>
            <v-row>
              <v-col :md="item.md" v-for="(item, iItem) in group.items" :key="iItem">
                <component
                  v-model="localItem[item.name]"
                  v-bind="getProps(item)"
                  :is="typesComponents[item.type]" 
                  @change="setFormValue(item.name, $event)" />
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>

        <v-expansion-panel-content v-if="group.address">
          <AddressFormPage :address="address" />
        </v-expansion-panel-content>
      </v-expansion-panel>      
    </v-expansion-panels>

    <div class="mt-5">
      <Button label="Salvar" color="primary" :icon="icons.save" :loading="loadingSave" @click="save" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mask } from 'vue-the-mask';
import { save } from '@/utils/icons';
import locales from '@/locales/pt-BR';
import TypePageMixin from '@/mixins/TypePageMixin';
import Icon from '@/components/vuetify/Icon';
import typesComponents from '@/utils/typesComponents'
import Button from '@/components/vuetify/Button';
import AddressFormPage from './components/AddressFormPage';

export default {
  name: 'DynamicFormPage',
  components: { Icon, Button, AddressFormPage },
  props: {
    schema: {
      type: Object,
      required: true
    },
    service: {
      type: Object,
      required: true
    }
  },
  directives: { mask },
  data() {
    return {
      icons: {
        save: save,
      },
      panel: [0],
      valid: true,
      form: {},
      typesComponents: typesComponents,
      loadingSave: false,
      localItem: {},
      address: {},
    }
  },
  mounted() {
    if(this.typePage === this.typePageOptions.show)
      this.show();
  },
  mixins: [TypePageMixin],
  methods: {
    getProps(item) {
      return { 
        type: item.type,
        label: item.label,
        readonly: item.readonly,
        disabled: item.disabled,
        rules: item.rules,
        items: item.items,
        itemText: item.itemText,
        itemValue: item.itemValue,
        counter: item.counter,
        maxLength: item.counter
      }
    },
    getEvents() {
      return { input: this.setValueForm, change: this.setValueForm }
    },
    getMasks(item) {
      return item.masks;
    },
    setFormValue(name, value) {
      _.set(this.form, name, value);
    },
    show() {
      const { id } = this.$route.params;
      this.service.show(id).then((res) => {
        let form = {}
        this.schema.fields.forEach((group) => {
          group.items.forEach((item) => {
            form[item.name] = res[item.name]
          })
        })
        this.localItem = form
      }).catch((err) => {
        this.$noty.error(err);
        this.$router.push({name: this.schema.routes.list.name});
      });
    },
    save() {
      this.loadingSave = true;

      if(this.schema.business){
        if ( typeof this.schema.business.beforeSave === 'function' )
          this.schema.business.beforeSave(this.localItem)
      }

      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create(){
      if(this.schema.formAddress) this.form.address = this.address;
      this.service.create(this.form).then(() => {
        this.$noty.success(locales.alerts.createdRegister);
        this.$router.push({name: this.schema.routes.list.name});
        this.loadingSave = false;
      }).catch((err) => {
        this.loadingSave = false;
        this.$noty.error(err);
      });
    },
    update() {
      const { id } = this.$route.params;
      if(this.schema.formAddress) this.localItem.address = this.address;

      this.service.update(id, this.localItem).then(() => {
        this.$noty.success(locales.alerts.updatedRegister)
        this.$router.push({name: this.schema.routes.list.name});
        this.loadingSave = false;
      }).catch((err) => {
        this.$noty.error(err);
        this.loadingSave = false;
      });
    },
  }
}
</script>

<style>

</style>