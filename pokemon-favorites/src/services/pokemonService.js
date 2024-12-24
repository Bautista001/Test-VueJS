const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const getPokemonList = async (page = 0) => {
  const limit = 20;
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${page * limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }

    const pokemons = await response.json();
    return {
      status: true,
      pokemons: pokemons.results.map((pokemon) => {
        return {
          name: pokemon.name,
          display_name: capitalize(pokemon.name)
        }
      }),
    };

  } catch {
    return {
      status: false
    };
  }
};

export const getPokemonByName = async (pokemonName) => {
  try {
    const response = await fetch(`${API_URL}/${pokemonName}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch details for Pokémon: ${pokemonName}`);
    }

    const pokemon = await response.json();

    return {
      status: true,
      pokemon: {
        height: pokemon.height,
        weight: pokemon.weight,
        name: pokemon.name,
        display_name: capitalize(pokemon.name),
        sprites: {
          front_default: pokemon.sprites.front_default,
          back_default: pokemon.sprites.back_default,
        },
        types: pokemon.types
          .map((type) => {
            return capitalize(type.type.name);
          })
          .join(', ')
      },
    };

  } catch {
    return {
      status: false
    };
  }
};
