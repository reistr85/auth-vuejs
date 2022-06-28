<template>
  <div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel v-for="(group, iGroup) in schema.fields" :key="iGroup">
          <v-expansion-panel-header>
            <h3><Icon :icon="group.icon" class="mr-3" /> {{ group.title }}</h3>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" :lg="item.md" v-for="(item, iItem) in group.items" :key="iItem">
                <component v-model="localItem[item.name]" :is="typesComponents[item.type]" v-if="!item.noForm"
                  v-bind="getProps(item)" v-on="getEvents(item)" />
              </v-col>
            </v-row>
          </v-expansion-panel-content>

          <v-expansion-panel-content v-if="group.type === 'dataTable'">
            <!-- <DataTable
              show-select
              single-select
              :headers="[]"
              :items="{data: []}"
              :loading="false" /> -->
              <!-- {{ getItemsChildren(group) }} -->
              {{ itemsChildren[group.service.items] }}
          </v-expansion-panel-content>

          <v-expansion-panel-content v-if="group.type === 'address'">
            <AddressFormPage :address="address" @setAddressByZipCode="setAddressByZipCode" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="mt-5">
        <Button label="Voltar" color="light" class="mr-2" rounded :icon="icons.arrowLeft" @click="$router.back()" />
        <Button label="Salvar" color="primary"  rounded :icon="icons.save" :loading="loadingSave" @click="save" />
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mask } from 'vue-the-mask';
import { save, arrowLeft } from '@/utils/icons';
import TypePageMixin from '@/mixins/TypePageMixin';
import Icon from '@/components/vuetify/Icon';
import typesComponents from '@/utils/typesComponents';
import Button from '@/components/vuetify/Button';
import AddressFormPage from './components/AddressFormPage';
import DataTable from '@/components/vuetify/DataTable';

export default {
  name: 'DynamicFormPage',
  components: { Icon, Button, AddressFormPage, DataTable },
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
        arrowLeft: arrowLeft,
      },
      panel: [],
      valid: true,
      form: {},
      typesComponents: typesComponents,
      loadingSave: false,
      localItem: {},
      address: {},
      itemsSelect: {},
      itemsChildren: {}
    };
  },
  mounted() {
    this.mountItemsSelects();
    this.getItemsChildren();
    this.typePage === this.typePageOptions.show ? this.show() : this.handlerBeforeForm();
  },
  mixins: [TypePageMixin],
  methods: {
    getProps(item) {
      return  {
        label: item.label,
        readonly: item.readonly,
        disabled: item.disabled,
        rules: item.rules,
        ...item.type === 'text' && { type: item.type, counter: item.counter, maxLength: item.counter },
        ...item.type === 'password' && { type: item.type, counter: item.counter, maxLength: item.counter },
        ...item.type === 'select' && { items: this.itemsSelect[item.name], default: item.default, itemText: item.itemText, itemValue: item.itemValue, multiple: item.multiple, },
        ...item.type === 'percent' && { clearable: item.clearable, suffix: item.suffix, length: item.length, precision: item.precision, empty: item.empty },
        ...item.type === 'money' && { clearable: item.clearable, prefix: item.prefix, length: item.length, precision: item.precision, empty: item.empty },
        ...item.type === 'integer' && { name: item.name, clearable: item.clearable, inputMask: item.inputMask, outputMask: item.outputMask, applyAfter: item.applyAfter, empty: item.empty },
        ...item.type === 'simpleMask' && { name: item.name, clearable: item.clearable, inputMask: item.inputMask, outputMask: item.outputMask, applyAfter: item.applyAfter, empty: item.empty, alphanumeric: item.alphanumeric },
        ...item.type === 'dataPicker' && { model: item.name, noInitial: item.noInitial, now: item.now  },
      };
    },
    getEvents(item) {
      return  { change: () => this.changeBusiness(item) };
    },
    async show() {
      const { id } = this.$route.params;
      this.service.show(id).then((res) => {
        let form = {};
        this.schema.fields.forEach((group) => {
          group.items.forEach((item) => {
            form[item.name] = res[this.schema.domainSingle][item.name];
            if (item.type === 'select' && item.multiple) form[item.name] = res[item.name].split(', ');
          });
        });
        this.localItem = form;
        this.address = res.address || {};
        this.handlerBeforeForm();
      }).catch((err) => {
        this.$noty.error(err);
        this.$router.push({name: this.schema.routes.list.name});
      });
    },
    save() {
      if (!this.$refs.form.validate())
        return;

      this.loadingSave = true;

      if  (this.schema.business){
        if ( typeof this.schema.business.beforeSave === 'function' )
          this.schema.business.beforeSave(this.localItem);
      }

      this.typePage === this.typePageOptions.create ? this.create() : this.update();
    },
    create() {
      if (this.schema.formAddress) this.localItem.address = this.address;
      this.service.create(this.localItem).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.createdRegister);
        this.$router.back();
        this.loadingSave = false;
      }).catch((err) => {
        console.error(`Create error: ${err}`);
        this.loadingSave = false;
        this.$noty.error(err);
      });
    },
    update() {
      const { id } = this.$route.params;
      if (this.schema.formAddress) this.localItem.address = this.address;

      this.service.update(id, this.localItem).then(() => {
        this.$noty.success(this.$locales.pt.default.alerts.updatedRegister);
        this.$router.back();
        this.loadingSave = false;
      }).catch((err) => {
        this.$noty.error(err);
        this.loadingSave = false;
      });
    },
    setAddressByZipCode(address) {
      if (!address)
        return;

      this.address = { ...address };
    },
    mountItemsSelects() {
      this.schema.fields.forEach((field, index) => {
        if (field.openGroup)
          this.panel.push(index);

        field.items.forEach((item) => {
          if (item.default) this.localItem[item.name] = item.default;

          if (item.type === 'select' && item.service?.has) {
            axios[item.service.verb](`${item.service.endpoint}?${item.service.queryParams}`).then((res) => {
              const items = res.data.data.map((i) => {
                return { [item.itemText]: i[item.itemText], [item.itemValue]: i[item.itemValue] };
              });
              items.unshift({ [item.itemText]: '', [item.itemValue]: 0 });
              this.$set(this.itemsSelect, item.name, items);
            }).catch(() => {
            });
          } else {
            this.$set(this.itemsSelect, item.name, item.items);
          }
        });
      });
    },
    changeBusiness(item) {
      if (this.schema.business?.changes[item.name]) this.schema.business?.changes[item.name](this.localItem, this.schema.fields, item);
    },
    getItemsChildren() {
      this.schema.fields.forEach((field) => {
        if (field.type === 'dataTable') {
          axios[field.service.verb](`${field.service.endpoint}?${field.service.queryParams}`).then((res) => {
            this.$set(this.itemsChildren, 'all_types', res.data);
          }).catch(() => {
          });
        }
      });
    },
    handlerBeforeForm() {
      if (this.schema.business?.beforeForm) this.schema.business?.beforeForm(this.localItem, this.schema.fields);
    }
  }
};
</script>
