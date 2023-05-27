'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataLocation = createAsyncThunk('lugares/getData', async(arg, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('http://localhost:3001/location')
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const nameLocation = createAsyncThunk('lugares/getName', async(name, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/location?name=${name}`)
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const detailLocation = createAsyncThunk('lugares/detailLo', async(id, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/location/${id}`)
        console.log(data);
        return data;
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const locationPost = createAsyncThunk('lugares/postLo', async(payload) => {
    const {data} = await axios.post('http://localhost:3001/location', payload)
    return data;
})
export const locationDelete = createAsyncThunk('lugares/deleteLo', async(id) => {
    const {data} = await axios.delete(`http://localhost:3001/location/${id}`)
    return data;
})


const initialState = {
    location: [],
    allLocation: [],
    detailLocation: {},
    isSuccess: false,
    alertas: [],
    loading: false,
    message: "",
    error: null
}

export const locationSlice = createSlice({
    name: 'lugares',
    initialState,
    reducers: {
        getLocation: (state, action) => {
            state.location = action.payload;
            state.allLocation = action.payload;
        },
        getNameLocation: (state, action) => {
            state.location = action.payload;
        },
        locationDetail: (state, action) => {
            state.detailLocation = action.payload;
        },
        postLocation: (state, action) => {

        },
        deleteLocation: (state, action) => {
            const id = action.payload;
            return state.filter((e) => e.id !== id)
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getDataLocation.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(getDataLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.location = action.payload;
            state.allLocation = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(getDataLocation.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(nameLocation.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(nameLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.location = action.payload;
            state.allLocation = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(nameLocation.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(detailLocation.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(detailLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.detailLocation = action.payload;
            state.isSuccess = true;
        }),
        builder.addCase(detailLocation.rejected, (state, action) => {
            state.message = action.payload;
            state.loading = false;
            state.isSuccess = false;
        }),
        builder.addCase(locationPost.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(locationPost.fulfilled, (state, action) => {
            state.loading = false;
            state.location.push(action.payload);
            state.alertas.push({
                type: 'success',
                message: 'Location created Successfully',
                id: new Date().getTime()
            })
        }),
        builder.addCase(locationPost.rejected, (state, action) => {
            state.message = action.payload;
            state.alertas.push({
                type: 'error',
                message: action.error.message,
                id: new Date().getTime()
            })
        }),
        builder.addCase(locationDelete.pending, (state, action) => {
            state.loading = true;
        }),
        builder.addCase(locationDelete.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.message = "Location deleted Successfully";
            const index = state.location.findIndex((lo) => lo.id === action.payload.id);
            if (index !== -1) {
                state.location.splice(index, 1);
            }
        }),
        builder.addCase(locationDelete.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "Could not delete location";
            state.error = action.error.message;
        })
    }
})

export const {
    getLocation,
    getNameLocation,
    locationDetail,
    postLocation,
    deleteLocation,
    setLoading
} = locationSlice.actions;

export default locationSlice.reducer;