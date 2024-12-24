<template>
    <Spinner />
</template>

<script>
import Spinner from '../components/Spinner.vue';

export default {
  components: {
    Spinner
  },
  created() {
    setTimeout(() => {
      $router.push('/pokemon-list');
    }, 1500);
  }
}
</script>
