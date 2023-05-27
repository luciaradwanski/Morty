'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataEpisodes = createAsyncThunk('episodios/getData', async(arg, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('http://localhost:3001/episodes')
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const nameEpisodes = createAsyncThunk('episodios/getName', async(name, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/episodes?name=${name}`)
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const detailEpisodes = createAsyncThunk('episodios/detailEp', async(id, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/episodes/${id}`)
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const episodesPost = createAsyncThunk('episodes/postEp', async(payload) => {
    const {data} = await axios.post('http://localhost:3001/episodes', payload)
    return data;
})
export const episodesDelete = createAsyncThunk('episodios/deleteEp', async(id) => {
    const {data} = await axios.delete(`http://localhost:3001/episodes/${id}`)
    return data;
})


const initialState = {
    episodes: [],
    allEpisodes: [],
    detailEpisodes: {},
    isSuccess: false,
    alertas: [],
    loading: false,
    message: "",
    error: null
}

export const episodeSlice = createSlice({
    name: 'episodios',
    initialState,
    reducers: {
        getEpisodes: (state, action) => {
            state.episodes = action.payload;
            state.allEpisodes = action.payload;
        },
        getNameEpisodes: (state, action) => {
            state.episodes = action.payload;
        },
        episodesDetail: (state, action) => {
            state.detailEpisodes = action.payload;
        },
        postEpisodes: (state, action) => {

        },
        deleteEpisodes: (state, action) => {
            const id = action.payload;
            return state.filter((e) => e.id !== id)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getDataEpisodes.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(getDataEpisodes.fulfilled, (state, action) => {
            state.loading = false;
            state.episodes = action.payload;
            state.allEpisodes = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(getDataEpisodes.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(nameEpisodes.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(nameEpisodes.fulfilled, (state, action) => {
            state.loading = false;
            state.episodes = action.payload;
            state.allEpisodes = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(nameEpisodes.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(detailEpisodes.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(detailEpisodes.fulfilled, (state, action) => {
            state.loading = false;
            state.detailEpisodes = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(detailEpisodes.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(episodesPost.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(episodesPost.fulfilled, (state, action) => {
            state.loading = false;
            state.episodes.push(action.payload);
            state.alertas.push({
                type: 'success',
                message: 'Episodes created Successfully',
                id: new Date().getTime()
            })
        }),
        builder.addCase(episodesPost.rejected, (state, action) => {
            state.message = action.payload;
            state.alertas.push({
                type: 'error',
                message: action.error.message,
                id: new Date().getTime()
            })
        }),
        builder.addCase(episodesDelete.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(episodesDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.message = "Episodes deleted Successfully";
            const index = state.episodes.findIndex((ep) => ep.id === action.payload.id);
            if (index !== -1) {
                state.episodes.splice(index, 1);
            }
        }),
        builder.addCase(episodesDelete.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "Could not delete episodes";
            state.error = action.error.message;
        })
    }
})

export const {
    getEpisodes,
    getNameEpisodes,
    episodesDetail,
    postEpisodes,
    deleteEpisodes,
    setLoading
} = episodeSlice.actions;

export default episodeSlice.reducer;