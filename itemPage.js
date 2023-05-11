/**
 * This is the script for the item page, I had to separate it out from the pokemon page to allow for pagination. (I tried making a state machine to go between pokemon and items but it didnt work correctly)
 */

import { div } from "./config.js";
import { itemUrl } from "./config.js";

/**
 * the offset that dictates where the pagination starts from; tried putting it into the config file, but it would only act as a constant
 */
let offset = 0;

let pre = document.getElementById("pre");
let next = document.getElementById("next");
let searchText = document.getElementById("searchText");
let searchButton = document.getElementById("searchButton");

// clear the container to be populated by new items
div.innerHTML = "";

loadItems();

/**
 * Returns array of item objects from api from offset to offset+20
 * @returns an array of item objects
 */
async function loadArrayOfItems() {
  const ArrayOfItems = await fetch(`${itemUrl}?offset=${offset}&limit=20`);
  const json = await ArrayOfItems.json();
  return json.results;
}

/**
 * loads items from the array onto cards and places them on the page
 */
async function loadItems() {
  const ArrayOfItems = await loadArrayOfItems();
  for (let i = 0; i < ArrayOfItems.length; i++) {
    await writeItem(String(i + 1));
  }
}

/**
 * Performs a search for an item by name or id
 * @param {*} nameOrNum 
 */
async function searchItem(nameOrNum)
{
  div.innerHTML = "";
  writeItem(nameOrNum);
}

/**
 * writes an item to a card and places it into the page; name or number works
 * @param {*} ItemNameOrNum 
 */
export async function writeItem(ItemNameOrNum){
    let url = `${itemUrl}${ItemNameOrNum.toLowerCase()}`;
    let response = await fetch(url);
    let data = await response.json();
    let flavor = [];
    for(let i = 0; i < data.flavor_text_entries.length; i++){
        flavor.push(data.flavor_text_entries[i].language.name);
    }

    let en = flavor.indexOf('en');
    let content = div.innerHTML + 
    `<div class="card col-lg-2 col-md-4 col-sm-6">
        <img src="${data.sprites.default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.flavor_text_entries[en].text}</p>
            <p class="card-text">CATEGORY: ${data.category.name}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;

    div.innerHTML = content;
}

searchButton.addEventListener("click", async () => {
  try{
    searchItem(searchText.value);
  }
  catch{}
})

try {
    // paginates to the next array of items
  next.addEventListener("click", async () => {
    div.innerHTML = "";
    offset += 20;
    const ArrayOfItems = await loadArrayOfItems();
    for (let i = 0; i < ArrayOfItems.length; i++) {
      await writeItem(String(offset + i + 1));
    }
  });

  // paginates to the prior array of items
  pre.addEventListener("click", async () => {
    div.innerHTML = "";
    offset -= 20;
    const ArrayOfItems = await loadArrayOfItems();
    for (let i = 0; i < ArrayOfItems.length; i++) {
      await writeItem(String(offset + i + 1));
    }
  });
} catch {}