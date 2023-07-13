import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";
import { ListingSlice } from "./ListingSlice";
import pokemonDetailSlice from "./PokemonDetail";

export const Store = () =>
  configureStore({
    reducer: {
      pokemonList: ListingSlice.reducer,
      pokemonDetails: pokemonDetailSlice.reducer

    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof Store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const Nextstore = createWrapper<AppStore>(Store);
