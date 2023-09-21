'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataCharacters = createAsyncThunk('personajes/getData', async(arg, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('http://localhost:3001/characters')
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(`Error al obtener datos de países: ${error.message}`);
    }
})

export const nameCharacters = createAsyncThunk('personajes/getN', async (name, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/characters?name=${name}`);
            console.log(data);
            return data;
        } catch (error) {
            throw rejectWithValue(error.response.data);
        }
    }
);

export const detailCharacters = createAsyncThunk('personajes/detailCha', async(id, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/characters/${id}`)
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const charactersPost = createAsyncThunk('personajes/postCha', async(payload) => {
    const {data} = await axios.post('http://localhost:3001/characters', payload)
    return data;
})
export const charactersDelete = createAsyncThunk('personajes/deleteCha', async(id) => {
    const {data} = await axios.delete(`http://localhost:3001/characters/${id}`)
    return data;
})


const initialState = {
    characters: [],
    allCharacters: [],
    detailCharacter: {},
    paginationCards: [],
    isSuccess: false,
    alertas: [],
    loading: false,
    message: "",
    error: null
}

export const characterSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {
        getCharacters: (state, action) => {
            state.characters = action.payload;
            state.allCharacters = action.payload;
        },
        getNameCharacters: (state, action) => {
            state.characters = action.payload;
        },
        charactersDetail: (state, action) => {
            state.detailCharacter = action.payload;
        },
        getPaginationCharacter: (state, action) => {
            const { payload } = action;
            const addCharacters = payload.results;
            state.paginationCards = addCharacters;
        },
        postCharacters: (state, action) => {

        },
        deleteCharacters: (state, action) => {
            const id = action.payload;
            return state.filter((c) => c.id !== id)
        },
        filterByStatus: (state, action) => {
            const allCharacters = state.allCharacters;
            const statusFilter =
                action.payload === 'All'
                ? allCharacters
                : allCharacters.filter((el) => el.status === action.payload);
            state.characters = statusFilter;
        },
        filterBySpecies: (state, action) => {
            const allCharacters = state.allCharacters;
            const speciesFilter =
                action.payload === 'All'
                ? allCharacters
                : allCharacters.filter((el) => el.species === action.payload);
            state.characters = speciesFilter;
        },
        filterByOrigin: (state, action) => {
            const allCharacters = state.allCharacters;
            const originFilter =
                action.payload === 'All'
                ? allCharacters
                : allCharacters.filter((el) => el.origin === action.payload);
            state.characters = originFilter;
        },
        filterByGender: (state, action) => {
            const allCharacters = state.allCharacters;
            const genderFilter =
                action.payload === 'All'
                ? allCharacters
                : allCharacters.filter((el) => el.gender === action.payload);
            state.characters = genderFilter;
        },
        
        orderByName: (state, action) => {
            let sortedArr =
                action.payload === 'asc'
                ? state.characters.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : state.characters.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            state.characters = sortedArr;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getDataCharacters.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(getDataCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.characters = action.payload;
            state.allCharacters = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(getDataCharacters.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(nameCharacters.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(nameCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.characters = action.payload;
            state.allCharacters = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(nameCharacters.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(detailCharacters.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(detailCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.detailCharacter = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(detailCharacters.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(charactersPost.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(charactersPost.fulfilled, (state, action) => {
            state.loading = false;
            state.characters.push(action.payload);
            state.alertas.push({
                type: 'success',
                message: 'Characters created Successfully',
                id: new Date().getTime()
            })
        }),
        builder.addCase(charactersPost.rejected, (state, action) => {
            state.message = action.payload;
            state.alertas.push({
                type: 'error',
                message: action.error.message,
                id: new Date().getTime()
            })
        }),
        builder.addCase(charactersDelete.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(charactersDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.message = "Characters deleted Successfully";
            const index = state.characters.findIndex((cha) => cha.id === action.payload.id);
            if (index !== -1) {
                state.characters.splice(index, 1);
            }
        }),
        builder.addCase(charactersDelete.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "Could not delete characters";
            state.error = action.error.message;
        })
    }
})

export const {
    getCharacters,
    getNameCharacters,
    charactersDetail,
    getPaginationCharacter,
    postCharacters,
    deleteCharacters,
    filterByStatus,
    filterByGender,
    filterByOrigin,
    filterBySpecies,
    orderByName,
    setLoading
} = characterSlice.actions;

export default characterSlice.reducer;