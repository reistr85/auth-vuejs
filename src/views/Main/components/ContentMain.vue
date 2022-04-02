<template>
  <div class="content-main" :class="[height >= 500 ? 'padding-content-desktop' : 'padding-content-mobile']">
    <router-view></router-view>
    <p class="text-caption text-center mt-5" x-small>Todos os direitos reservados à MGE Tech - Siscomge - 2021</p>
  </div>
</template>

<script>
import BreakPointMixin from '@/mixins/BreakPointMixin';

export default {
  name: 'ContentMain',
  data() {
    return {
    };
  },
  mixins: [BreakPointMixin],
};
</script>

<style scope>

.content-main {
  height: 100%;
  width: 100%;
}

.padding-content-desktop {
  padding: 50px 50px 0 50px;
}

.padding-content-mobile {
  padding: 20px 20px 0 20px;
}

.content-main-title {
  justify-content: space-between;
  align-items: flex-end;
}
</style>