import {getPokemonByNameOrNum} from './pokemon.js';
import {getAllPokemon} from './pokemon.js';
import {getAllBerries} from './berries.js';
import {getBerryByNameOrNum} from './berries.js';
import {getAllItems} from './items.js';
import {getItemByNameOrNum} from './items.js';
import { p } from './pokemon.js';

// can use numbers as strings and names in getPokemon("1")
console.log(getPokemonByNameOrNum("1"));
console.log(getPokemonByNameOrNum("pikachu"));
console.log(getBerryByNameOrNum("1"));
console.log(getBerryByNameOrNum("oran"));
console.log(getItemByNameOrNum("1"));
console.log(getItemByNameOrNum("master-ball"));



// 1281 pokemon in total
console.log(getAllBerries());
console.log(getAllPokemon());
console.log(getAllItems());
console.log(p);
