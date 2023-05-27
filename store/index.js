'use client'

import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from './characterSlice/characterSlice';
import episodesReducer from './episodeSlice/episodeSlice';
import locationReducer from './locationSlice/locationSlice';


export const store = configureStore({
    reducer: {
        personajes: charactersReducer,
        episodios: episodesReducer,
        lugares: locationReducer,
    }
})