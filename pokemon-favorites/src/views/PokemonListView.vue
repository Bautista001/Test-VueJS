<template>
  <div class="pokemon-list-view">
    <SearchBar :searchTerm="searchTerm" @search="debouncedSearch" />

    <div v-if="pokemonStore.isLoading">
      <Spinner />
    </div>

    <div v-else>
      <div v-if="!pokemonStore.error && filteredPokemonList.length > 0">
        <div v-for="pokemon in filteredPokemonList" class="list-item" :key="pokemon.name"
          @click="selectPokemon(pokemon.name)">
          <span class="list-item-name">{{ pokemon.display_name }}</span>
          <div class="star-container" @click.stop="setFavorite(pokemon.name)">
            <StarIcon class="star-icon" :class="pokemon.isFavorite ? 'active' : 'inactive'" />
          </div>
        </div>
      </div>
      <div class="list-not-found" v-else>
        <h2 class="title">Uh-oh!</h2>
        <p class="subtitle">You look lost on your journey!</p>
        <button @click="goToWelcome" class="btn btn-primary">Go back home</button>
      </div>
    </div>

    <FilterBar :activeFilter="activeFilter" @filter="toggleFilter" />

    <PokemonModal v-if="showPokemonDetails && pokemonDetail" :pokemon="pokemonDetail" @close="closeModal"
      @setFavorite="setFavorite" />

  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '@/stores/pokemonStore';
import SearchBar from '@/components/SearchBar.vue';
import FilterBar from '@/components/FilterBar.vue';
import PokemonModal from '@/components/PokemonModal.vue';
import { useRouter } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import StarIcon from '@/components/icons/star.vue';
import { debounce } from 'lodash';

const router = useRouter()

const pokemonStore = usePokemonStore();
const { filteredPokemons } = storeToRefs(pokemonStore);

const activeFilter = ref('all');
const searchTerm = ref('');
const pokemonDetail = ref([]);
const showPokemonDetails = ref(false);


const filteredPokemonList = computed(() => {
  let list = filteredPokemons.value;
  if (searchTerm.value) {
    list = list.filter(pokemon => pokemon.name.includes(searchTerm.value.toLowerCase()));
  }
  if (activeFilter.value === 'favorites') {
    list = list.filter(pokemon => pokemon.isFavorite);
  }
  return list;
});

const getPokemons = async () => {
  try {
    await pokemonStore.fetchPokemons(pokemonStore.currentPage);

  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
};

const toggleFilter = (filter) => {
  searchTerm.value = '';
  activeFilter.value = filter;
};

const setFavorite = (pokemonName) => {
  pokemonStore.setFavorite(pokemonName);
};

const selectPokemon = async (pokemonName) => {
  pokemonDetail.value = await pokemonStore.selectPokemon(pokemonName);
  showPokemonDetails.value = true;
};

const changeSearch = async (search) => {
  searchTerm.value = search;
};
const debouncedSearch = debounce(changeSearch, 300, false)

const closeModal = () => {
  showPokemonDetails.value = false;
};

const goToWelcome = () => {
  router.replace('/');
};

onBeforeMount(async () => {
  await getPokemons();
});
</script>

<style scoped lang="scss">
.pokemon-list-view {
  text-align: center;
  width: 40%;
  margin-bottom: 10%;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: var(--padding-sm) var(--padding-md);
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: var(--padding-sm);
  transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
  .pokemon-list-view {
    width: 100%;
    margin-bottom: 20%;
  }
}
</style>