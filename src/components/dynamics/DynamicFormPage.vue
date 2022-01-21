<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="(group, iGroup) in schema.fields" :key="iGroup">
        <v-expansion-panel-header>
          <h3><Icon icon="mdi-calendar" class="mr-3" /> {{ group.title }}</h3>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-form ref="refsForm">
            <v-row>
              <v-col :md="item.md" v-for="(item, iItem) in group.items" :key="iItem">
                <component
                  v-bind="getProps(item)"
                  :is="typesComponents[item.type]" 
                  @change="setFormValue(item.name, $event)" />
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>      
    </v-expansion-panels>

    <div class="mt-5">
      <Button label="Salvar" color="primary" :icon="icons.save" @click="save" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { save } from '@/utils/icons';
import Icon from '@/components/vuetify/Icon';
import typesComponents from '@/utils/typesComponents'
import Button from '@/components/vuetify/Button';

export default {
  name: 'DynamicFormPage',
  components: { Icon, Button },
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
  data() {
    return {
      icons: {
        save: save,
      },
      panel: [0],
      form: {},
      typesComponents: typesComponents,
      loadingSave: false,
    }
  },
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
    setFormValue(name, value) {
      _.set(this.form, name, value);
    },
    save() {
      if(!this.$refs.refsForm.validate())
        return;

      this.loadingSave = true;
      const { id } = this.$route.params;

      if(this.schema.business){
        if ( typeof this.schema.business.beforeSave === 'function' )
          this.schema.business.beforeSave(this.localItem)
      }

      this.typePage === 'create' ? this.create(this.localItem) : this.update(id, this.localItem);
    },
    create(item){
      this.service.create(item).then(() => {
        this.$noty.success('Registro salvo com sucesso!');
        this.$router.push({name: this.schema.routes.list.name});
        this.loadingSave = false;
      }).catch((err) => {
        this.loadingSave = false;
        this.$noty.error(err);
      });
    },
    update(id, item) {
      this.service.update(id, item).then(() => {
        this.$noty.success('Registro alterado com sucesso!');
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