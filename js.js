/**
 * Returns pokemon from api by name or number
 * @param {"1"} nameOrNumber 
 */
async function getPokemonByNameOrNum(nameOrNumber) {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    
    url = `${url}${nameOrNumber.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
// can use numbers as strings and names in getPokemon()
console.log(getPokemonByNameOrNum("1"));
console.log(getPokemonByNameOrNum("pikachu"));

/**
 * Returns all pokemon from api
 */
async function getAllPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1007';
    
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// 1281 pokemon in total
console.log(getAllPokemon());