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
async function searchPokemon(nameOrNum) {
  div.innerHTML = "";
  writePokemon(nameOrNum);
}

/**
 * writes a pokemon to a card and places it into the page; name or number works
 * @param {*} pokemonNameOrNum
 */
export async function writePokemon(pokemonNameOrNum) {
  try {
    let url = `${pokeUrl}${pokemonNameOrNum.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();

    /**
     * array of individual pokemons types
     */
    let types = [];
    for (let i = 0; i < data.types.length; i++) {
      types.push(data.types[i].type.name);
    }

    /**
     * content to be output
     */
    let content =
      div.innerHTML +
      `<div class="card col-lg-2 col-md-4 col-sm-6">
      <img src="${data.sprites.front_default}" class="card-img-top" alt="${
        data.name
      }">
      <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">ID: ${data.id}</p>
          <p class="card-text">ORDER: ${data.order}</p>
          <p class="card-text">TYPE(S): ${types.join(", ")}</p>
      </div>
  </div>`;

    div.innerHTML = content;
  } catch {
    div.innerHTML =
      "<h1 style='color: red;'>No results found; check spelling for errors and try again</h1>";
  }
}

// paginates to the next array of items
next.addEventListener("click", async () => {
  // 989 is 1007 - 18(18 items per page, 1007 pokemon to be shown from api)
  if (offset <= 989) {
    div.innerHTML = "";
    offset += 18;
    const ArrayOfPokemon = await loadArrayOfPokemon();
    for (let i = 0; i < ArrayOfPokemon.length; i++) {
      await writePokemon(String(offset + i + 1));
    }
  }
});

// paginates to the prior array of items
pre.addEventListener("click", async () => {
  if (offset >= 18) {
    div.innerHTML = "";
    offset -= 18;
    const ArrayOfPokemon = await loadArrayOfPokemon();
    for (let i = 0; i < ArrayOfPokemon.length; i++) {
      await writePokemon(String(offset + i + 1));
    }
  }
});

/**
 * saves string in searchtext to local storage and recalls it back to searchtext on load
 */
window.addEventListener("load", ()=>{
  if(localStorage.getItem("search") != null){
    searchText.value = localStorage.getItem("search");
  }
})

/**
 * on button click search api for result
 */
searchButton.addEventListener("click", async () => {
  localStorage.setItem("search", searchText.value);
  searchPokemon(searchText.value);
});
