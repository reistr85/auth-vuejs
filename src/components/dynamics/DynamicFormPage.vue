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
                <component v-model="localItem[item.name]" v-bind="getProps(item)" :is="typesComponents[item.type]" />
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>

        <v-expansion-panel-content v-if="group.address">
          <AddressFormPage :address="address" @setAddressByZipCode="setAddressByZipCode" />
        </v-expansion-panel-content>
      </v-expansion-panel>      
    </v-expansion-panels>

    <div class="mt-5">
      <Button label="Salvar" color="primary" :icon="icons.save" :loading="loadingSave" @click="save" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      value: 0,
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
      itemsSelect: {
      }
    }
  },
  mounted() {
    if(this.typePage === this.typePageOptions.show)
      this.show();

    this.mountItemsSelects();
  },
  mixins: [TypePageMixin],
  methods: {
    getProps(item) {
      return { 
        label: item.label,
        readonly: item.readonly,
        disabled: item.disabled,
        rules: item.rules,
        ...item.type === 'text' && { type: item.type, counter: item.counter, maxLength: item.counter },
        ...item.type === 'password' && { type: item.type, counter: item.counter, maxLength: item.counter },
        ...item.type === 'select' && { items: this.itemsSelect[item.name], itemText: item.itemText, itemValue: item.itemValue, },
        ...item.type === 'percent' && { clearable: item.clearable, suffix: item.suffix, length: item.length, precision: item.precision, empty: item.empty },
        ...item.type === 'money' && { clearable: item.clearable, prefix: item.prefix, length: item.length, precision: item.precision, empty: item.empty },
        ...item.type === 'integer' && { name: item.name, clearable: item.clearable, inputMask: item.inputMask, outputMask: item.outputMask, applyAfter: item.applyAfter, empty: item.empty },
        ...item.type === 'simpleMask' && { name: item.name, clearable: item.clearable, inputMask: item.inputMask, outputMask: item.outputMask, applyAfter: item.applyAfter, empty: item.empty },
      }
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
        this.address = res.address || {};
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
      if(this.schema.formAddress) this.localItem.address = this.address;
      this.service.create(this.localItem).then(() => {
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
    setAddressByZipCode(address) {
      if(!address)
        return;

      this.address = { ...address }
    },
    async mountItemsSelects() {
      this.schema.fields.forEach((field) => {
        field.items.forEach((item) => {
          if(item.type === 'select' && item.service?.has) {
            axios[item.service.verb](`${item.service.endpoint}?${item.service.queryParams}`).then((res) => {
              const items = res.data.data.map((i) => {
                return { [item.itemText]: i[item.itemText], [item.itemValue]: i[item.itemValue] }
              });
              items.unshift({ [item.itemText]: '', [item.itemValue]: 0 });
              this.$set(this.itemsSelect, item.name, items);
            }).catch((err) => {
              console.error(err)
            });
          }
        });
      });
    }
  }
}
</script>

<style>

</style>