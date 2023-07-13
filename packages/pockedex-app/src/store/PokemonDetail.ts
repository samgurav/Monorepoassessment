import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { GetDetails } from "pokedex-utils";

 type DetailData = {
    name: string;
    sprites: object | undefined;
    height: number;
    weight: number;
    location_area_encounters: string;
    abilities: [];
  };
const initialState: { data: DetailData | null } = { data: null };

export const pokemonDetailSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {
    PokemonDetail(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action?.payload?.pokemonDetails,
      };
    });
  },
});

export const { PokemonDetail } = pokemonDetailSlice.actions;
export default pokemonDetailSlice;


export const selectPokemonDetailData = (state: AppState) =>
  state?.pokemonDetails?.data;
  
  export const PokemonDetailAPI =
  (name: string | undefined): AppThunk =>
  async (dispatch) => {
    try {
      const res = await GetDetails(name);
      return dispatch(PokemonDetail(res));
    } catch {
      dispatch(PokemonDetail(null));
    }
  };
