import {berryUrl} from './config.js';

/**
 * to become the object for each berry
 */
export function Berry(id, name, image) {
    return{
        id: id,
        name: name,
        image: image
    }
}

/**
 * Returns berry from api by name or number
 * 
 * can use numbers as strings and names in getBerryByNameOrNum("1")
 * @param {string} nameOrNumber 
 */
export async function getBerryByNameOrNum(nameOrNumber) {
   let url = `${berryUrl}${nameOrNumber.toLowerCase()}`;
   let response = await fetch(url);
   let data = await response.json();
   return data;
}

/**
 * Returns all berries from api
 */
export async function getAllBerries() {
    let url = `${berryUrl}`;
    
    let response = await fetch(url);
    let data = await response.json();
    return data;
}