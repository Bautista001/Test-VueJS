import { defineStore } from 'pinia';
import { getPokemonList, getPokemonByName } from '@/services/pokemonService';

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    pokemons: [],
    pokemonDetails: {},
    favorites: [],
    isLoading: false,
    currentPage: 0,
    error: false,
    loadedPages: {},
  }),

  actions: {
    async fetchPokemons(page = 0) {
      if (this.loadedPages[page]) {
        return this.pokemons;
      }

      this.isLoading = true;
      this.error = false;

      const response = await getPokemonList(page);
      if (response.status) {
        this.pokemons = [...this.pokemons, ...response.pokemons];
        this.currentPage = page;
        this.loadedPages[page] = true;
      } else {
        this.error = true;
      }

      this.isLoading = false;
    },

    async selectPokemon(pokemonName) {
      if (this.pokemonDetails[pokemonName]) {
        return this.pokemonDetails[pokemonName];
      }

      this.isLoading = true;
      this.error = false;

      const response = await getPokemonByName(pokemonName);
      if (response.status) {
        const isFavorite = this.favorites.includes(pokemonName);
        this.pokemonDetails[pokemonName] = {
          ...response.pokemon,
          isFavorite: isFavorite
        };

        this.isLoading = false;
        return this.pokemonDetails[pokemonName];
      } else {
        this.error = true;
        this.isLoading = false;
        return null;
      }
    },

    setFavorite(pokemonName) {
      if (this.favorites.includes(pokemonName)) {
        this.favorites = this.favorites.filter(fav => fav !== pokemonName);
      } else {
        this.favorites.push(pokemonName);
      }
      if (this.pokemonDetails[pokemonName]) {
        this.pokemonDetails[pokemonName].isFavorite = !this.pokemonDetails[pokemonName].isFavorite;
      }
    },

    cleanState() {
      this.pokemons = [];
      this.pokemonDetails = {};
      this.isLoading = false;
      this.currentPage = 0;
      this.error = false;
    }
  },

  getters: {
    filteredPokemons(state) {
      return state.pokemons.map(pokemon => {
        return {
          ...pokemon,
          isFavorite: state.favorites.includes(pokemon.name),
        };
      });
    },
  },
});
