import {pokeUrl} from './config.js';

/**
 * to become the object for each pokemon
 */
export function Pokemon(id, name, image) {
    return{
        id: id,
        name: name,
        image: image
    }
}

/**
 * test variable
 */
export let p = Pokemon(1, "Bulbasaur", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png");



/**
 * Returns pokemon from api by name or number
 * 
 * can use numbers as strings and names in getPokemonByNameOrNum("1")
 * @param {string} nameOrNumber 
 */
export async function getPokemonByNameOrNum(nameOrNumber) {
   let url = `${pokeUrl}${nameOrNumber.toLowerCase()}`;
   let response = await fetch(url);
   let data = await response.json();
   return data;
}

/**
 * Returns all pokemon from api
 */
export async function getAllPokemon() {
    let url = `${pokeUrl}?offset=0&limit=1007`;
    
    let response = await fetch(url);
    let data = await response.json();
    return data;
}