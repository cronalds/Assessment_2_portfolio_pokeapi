/**
 * This is the script for the item page, I had to separate it out from the pokemon page to allow for pagination. (I tried making a state machine to go between pokemon and items but it didnt work correctly)
 */

import { div } from "./config.js";
import { itemUrl } from "./config.js";

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

loadItems();

/**
 * Returns array of item objects from api from offset to offset+20
 * @returns an array of item objects
 */
async function loadArrayOfItems() {
  const ArrayOfItems = await fetch(`${itemUrl}?offset=${offset}&limit=18`);
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
async function searchItem(nameOrNum) {
  div.innerHTML = "";
  writeItem(nameOrNum);
}

/**
 * writes an item to a card and places it into the page; name or number works
 * @param {*} ItemNameOrNum
 */
export async function writeItem(ItemNameOrNum) {
  try{
    let url = `${itemUrl}${ItemNameOrNum.toLowerCase()}`;
  let response = await fetch(url);
  let data = await response.json();

  /**
   * flavor text array
   */
  let flavor = [];
  /**
   * flavor text languages check
   */
  for (let i = 0; i < data.flavor_text_entries.length; i++) {
    flavor.push(data.flavor_text_entries[i].language.name);
  }

  /**
   * flavor text english index stored to en
   */
  let en = flavor.indexOf("en");

  /**
   * content to be output
   */
  let content =
    div.innerHTML +
    `<div class="card col-lg-2 col-md-4 col-sm-6">
        <img src="${data.sprites.default}" class="card-img-top" alt="${data.name}">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.flavor_text_entries[en].text}</p>
            <p class="card-text">CATEGORY: ${data.category.name}</p>
        </div>
    </div>`;

  div.innerHTML = content;
  }
  catch(e){
      div.innerHTML =
        `<h1 style='color: red;'>No results found; check spelling for errors and try again</h1>`;
  }
}

searchButton.addEventListener("click", async () => {
  searchItem(searchText.value);
});

// paginates to the next array of items
next.addEventListener("click", async () => {
  // 1640 is 1658 - 18(18 items per page, 1658 items in api)
  if (offset <= 1640) {
    div.innerHTML = "";
    offset += 18;
    const ArrayOfItems = await loadArrayOfItems();
    for (let i = 0; i < ArrayOfItems.length; i++) {
      await writeItem(String(offset + i + 1));
    }
  }
});

// paginates to the prior array of items
pre.addEventListener("click", async () => {
  if (offset >= 18) {
    div.innerHTML = "";
    offset -= 18;
    const ArrayOfItems = await loadArrayOfItems();
    for (let i = 0; i < ArrayOfItems.length; i++) {
      await writeItem(String(offset + i + 1));
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