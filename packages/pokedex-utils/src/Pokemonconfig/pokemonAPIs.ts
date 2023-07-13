import { ApiCall } from "../config";

 const pokedexapi = "https://pokeapi.co/api/v2/pokemon";
 
 export const GetPockemonList = () => {
  return ApiCall(`${pokedexapi}`);
};
export const GetDetails = (name: string |undefined |number) => {
  return ApiCall(`${pokedexapi}/${name}`);
};


