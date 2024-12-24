<template>
  <SpinnerIcon class="spinner" />
</template>

<script>
import SpinnerIcon from '@/components/icons/spinner.vue';

export default {
  components: {
    SpinnerIcon
  }
}
</script>

<style scoped>
.spinner {
  animation: spin 1s infinite linear;
  width: 150px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>