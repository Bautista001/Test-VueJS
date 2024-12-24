<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <div class="btn-close" @click="closeModal">
          <CloseIcon />
        </div>
        <img :src="pokemon.sprites.front_default" alt="Pokemon image" class="pokemon-image" />
      </div>
      <div class="modal-body">
        <div class="pokemon-info">
          <div class="info-item">
            <span class="font-bold">Name: </span>
            <span>{{ pokemon.display_name }}</span>
          </div>
          <div class="info-item">
            <span class="font-bold">Weight: </span>
            <span>{{ pokemon.weight }}</span>
          </div>
          <div class="info-item">
            <span class="font-bold">Height: </span>
            <span>{{ pokemon.height }}</span>
          </div>
          <div class="info-item">
            <span class="font-bold">Types: </span>
            <span>{{ pokemon.types }}</span>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" @click="copyToClipboard">Share to my friends</button>
          <div class="star-container" @click.stop="setFavorite(pokemon.name)">
            <StarIcon class="star-icon" :class="pokemon.isFavorite ? 'active' : 'inactive'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup type="ts">
import { toRefs, defineProps, defineEmits } from 'vue';
import StarIcon from '@/components/icons/star.vue';
import CloseIcon from '@/components/icons/close.vue';

const props = defineProps(["pokemon"]);
const { pokemon } = toRefs(props);

const emit = defineEmits(['close', 'setFavorite']);

const copyToClipboard = () => {
  const pokemonData = `Name: ${pokemon.value.display_name}, Weight: ${pokemon.value.weight / 10}kg, Height: ${pokemon.value.height / 10}mts, Types: ${pokemon.value.types.split(',')}`;
  
  navigator.clipboard.writeText(pokemonData);
}

const closeModal = () => {
  emit('close');
}
const setFavorite = () => {
  emit('setFavorite', pokemon.value.name);
}
</script>

<style scoped>
.modal-container {
  background-color: white;
  border-radius: 5px;
  width: 40%;
  position: relative;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-header {
  position: relative;
  height: 200px;
  /* Ajusta la altura del header */
  background-image: url('@/assets/poke-background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0 0;
}

.pokemon-image {
  position: absolute;
  width: 200px;
  height: auto;
  z-index: 1;
}

.modal-body {
  padding: 20px;
}

.pokemon-info {
  text-align: left;
  color: var(--color-medium-dark);
  margin: 5px 0;
}

.info-item {
  display: block;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-light);
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .modal-container {
    width: 90%;
  }
}
</style>