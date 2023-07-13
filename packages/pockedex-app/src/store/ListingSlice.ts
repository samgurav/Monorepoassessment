import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { GetPockemonList } from "pokedex-utils";

 type TableRow = { name: string; url: string };

const initialState: { 
    data: TableRow[]; 
    count: number; 
    Pokemondata: TableRow[][] } = {
  data: [],
  Pokemondata: [],
  count: 0,
};

export const ListingSlice = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {
    PokemonListing(state, action) {        
      state.data = action.payload;
    },
    SetData(state, action) {
      state.Pokemondata = action.payload;
    },
    setPokemonCount(state, action) {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action?.payload?.pokemonList,
      };
    });
  },
});

export const { PokemonListing, SetData, setPokemonCount } =
  ListingSlice.actions;
export default ListingSlice;


export const SelectListingData = (state: AppState) => state?.pokemonList?.data;
export const SelectDetailData = (state: AppState) =>
  state?.pokemonList?.Pokemondata;
export const selectCount = (state: AppState) => state?.pokemonList?.count;

export const PockemonListing = (): AppThunk => async (dispatch) => {
    try {
      const { results, count } = await GetPockemonList();      
      dispatch(PokemonListing(results));
      dispatch(setPokemonCount(count));
    } catch (error) {
      dispatch(PokemonListing([{ name: "Error", ulr: "Something went Wrong" }]));
    }
  };
