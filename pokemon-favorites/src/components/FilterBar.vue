<template>
  <div class="filter-bar">
    <div class="filter-btns">
      <button class="btn filter-btn" :class="activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'"
        @click="emit('filter', 'all')">
        <BarsIcon class="icon bars-icon" />
        <span>All</span>
      </button>
      <button class="btn filter-btn" :class="activeFilter === 'favorites' ? 'btn-primary' : 'btn-secondary'"
        @click="emit('filter', 'favorites')">
        <StarIcon class="icon" />
        <span>Favorites</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue';
import StarIcon from '@/components/icons/star.vue';
import BarsIcon from '@/components/icons/bars.vue';

const props = defineProps(["activeFilter"]);
const { activeFilter } = toRefs(props);

const emit = defineEmits(['filter']);

</script>

<style scoped lang="scss">
.filter-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--padding-md) var(--padding-lg);
  background-color: #fff;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
}

.filter-btns {
  display: flex;
  justify-content: center;
  gap: var(--padding-sm);
  text-align: center;
  width: 40%;
  margin: 0 auto;
}

.filter-btn {
  display: flex;
  justify-content: center;
  gap: var(--padding-sm);
  width: 100%;
}

@media (max-width: 768px) {
  .filter-btns {
    width: 100%;
  }
}
</style>
