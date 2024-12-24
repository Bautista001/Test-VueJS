<template>
  <div class="search-bar">
    <input type="text" v-model="localSearchTerm" @input="onInput" placeholder="Search" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  searchTerm: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['search']);

const localSearchTerm = ref(props.searchTerm);

const onInput = () => {
  emit('search', localSearchTerm.value);
};
watch(() => props.searchTerm, (newSearchTerm) => {
  localSearchTerm.value = newSearchTerm;
});
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  box-shadow: 0px 2px 10px 0px #0000000A;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
