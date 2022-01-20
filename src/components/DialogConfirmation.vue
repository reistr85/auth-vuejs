<template>
  <v-dialog
    v-model="dialog"
    persistent
    :max-width="maxWidth"
  >
    <v-card>
      <v-card-title class="headline">
        {{ message }}
      </v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small :color="colorButtons.noBtn" :dark="colorButtons.noBtn === 'red'" @click="$emit('noAction')">Não</v-btn>
        <v-btn small dark :color="colorButtons.yesBtn" :loading="loading" @click="$emit('yesAction')">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogConfirmation',
  props: {
    maxWidth: {
      type: Number,
      default: 480
    },
    dialog: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Deseja realmente excluir este registro?'
    },
    colorButtons: {
      type: Object,
      default: () => {
        return {
          noBtn: '',
          yesBtn: 'red'
        }
      }
    }
  },
  methods: {
  }
}
</script>