<template>
  <Card title="Adicionar Item">
    <h3>Conteúdo</h3>

    <div slot="actions">
      <Button label="Cancelar" :icon="$icons.cancel" color="primary" rounded class="" @click="$emit('update:dialog', false)" />
      <Button label="Adicionar" :icon="$icons.plus" color="secondary" rounded class="ml-3" @click="$emit('handleActionModal', form)" />
    </div>
  </Card>
</template>

<script>
import Card from '@/components/vuetify/Card';
import Button from '@/components/vuetify/Button';

export default {
  name: 'DialogAddItem',
  components: { Card, Button },
  props: {},
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style>

</style>