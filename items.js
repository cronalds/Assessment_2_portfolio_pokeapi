import {itemUrl} from './config.js';

/**
 * to become the object for each item
 */
export function Item(id, name, image) {
    return{
        id: id,
        name: name,
        image: image
    }
}

/**
 * Returns item from api by name or number
 * 
 * can use numbers as strings and names in getItemByNameOrNum("1")
 * @param {string} nameOrNumber 
 */
export async function getItemByNameOrNum(nameOrNumber) {
   let url = `${itemUrl}${nameOrNumber.toLowerCase()}`;
   let response = await fetch(url);
   let data = await response.json();
   return data;
}

/**
 * Returns all items from api
 */
export async function getAllItems() {
    let url = `${itemUrl}?offset=0&limit=1007`;
    
    let response = await fetch(url);
    let data = await response.json();
    return data;
}