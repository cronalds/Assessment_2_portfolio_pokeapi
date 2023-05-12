/**
 * This is the script for the pokemon page, I had to separate it out from the item page to allow for pagination. (I tried making a state machine to go between pokemon and items but it didnt work correctly)
 */

import { div } from "./config.js";
import { pokeUrl } from "./config.js";

/**
 * the offset that dictates where the pagination starts from; tried putting it into the config file, but it would only act as a constant
 */
let offset = 0;

/**
 * previous button
 */
let pre = document.getElementById("pre");
/**
 * next button
 */
let next = document.getElementById("next");
/**
 * text input for search
 */
let searchText = document.getElementById("searchText");
/**
 * button for search
 */
let searchButton = document.getElementById("searchButton");

// clear the container to be populated by new items
div.innerHTML = "";

loadPokemon();

/**
 * Returns array of pokemon objects from api from offset to offset+20
 * @returns an array of pokemon objects
 */
async function loadArrayOfPokemon() {
  const ArrayOfPokemon = await fetch(`${pokeUrl}?offset=${offset}&limit=18`);
  const json = await ArrayOfPokemon.json();
  return json.results;
}

/**
 * loads pokemon from the array onto cards and places them on the page
 */
async function loadPokemon() {
  const ArrayOfPokemon = await loadArrayOfPokemon();
  for (let i = 0; i < ArrayOfPokemon.length; i++) {
    await writePokemon(String(i + 1));
  }
}

/**
 * performs a search for a pokemon by name or id
 * @param {*} nameOrNum 
 */
async function searchPokemon(nameOrNum)
{
  div.innerHTML = "";
  writePokemon(nameOrNum);
}

/**
 * writes a pokemon to a card and places it into the page; name or number works
 * @param {*} pokemonNameOrNum 
 */
export async function writePokemon(pokemonNameOrNum){
  let url = `${pokeUrl}${pokemonNameOrNum.toLowerCase()}`;
  let response = await fetch(url);
  let data = await response.json();
  
  let types = [];
  for(let i = 0; i < data.types.length; i++){
      types.push(data.types[i].type.name);
  }
  
  let content = div.innerHTML + 
  `<div class="card col-lg-2 col-md-4 col-sm-6">
      <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
      <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">ID: ${data.id}</p>
          <p class="card-text">ORDER: ${data.order}</p>
          <p class="card-text">TYPE(S): ${types.join(', ')}</p>
      </div>
  </div>`;

  div.innerHTML = content;
}

try {
  // paginates to the next array of items
  next.addEventListener("click", async () => {
    div.innerHTML = "";
    offset += 20;
    const ArrayOfPokemon = await loadArrayOfPokemon();
    for (let i = 0; i < ArrayOfPokemon.length; i++) {
      await writePokemon(String(offset + i + 1));
    }
  });

  // paginates to the prior array of items
  pre.addEventListener("click", async () => {
    div.innerHTML = "";
    offset -= 20;
    const ArrayOfPokemon = await loadArrayOfPokemon();
    for (let i = 0; i < ArrayOfPokemon.length; i++) {
      await writePokemon(String(offset + i + 1));
    }
  });
} catch {}

searchButton.addEventListener("click", async () => {
  try{
    searchPokemon(searchText.value);
  }
  catch{}
})