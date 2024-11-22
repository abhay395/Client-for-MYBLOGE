import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBloge, featchBlogeById, featchBloges } from "./blogeApi";

const initialState = {
    bloges: null,
    loading: false,
    error: null,
    detailebloge:null,
    total:0
};

export const featchBlogesAsync = createAsyncThunk(
    "bloge/featchBloges",
    async (page,limit) => {
        const response = await featchBloges(page,limit);
        return response.data
    }
)
export const featchBlogeByIdAsync = createAsyncThunk(
    "bloge/featchBlogeById",
    async (id) => {
        const response = await featchBlogeById(id);
        return response.data
    }
)
export const createBlogeAsync = createAsyncThunk(
    "bloge/createBloge",
    async ({bloge}) => {
        const response = await createBloge({bloge});
        return response.data
    }
)
export const blogeSlice = createSlice({
    name: "bloge",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(featchBlogesAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(featchBlogesAsync.fulfilled, (state, action) => {
                state.loading = false
                state.bloges = action.payload.bloge
                state.total = action.payload.totalDocs
            })
            .addCase(featchBlogesAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(featchBlogeByIdAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(featchBlogeByIdAsync.fulfilled, (state, action) => {
                state.loading = false
                state.detailebloge = action.payload
            })
            .addCase(featchBlogeByIdAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(createBlogeAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(createBlogeAsync.fulfilled, (state, action) => {
                state.loading = false
                state.bloges.push(action.payload)
            })
            .addCase(createBlogeAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
});

export const selectBloges = (state) => state.bloge.bloges
export const selectSingleBloges = (state) => state.bloge.detailebloge
export const totalblogs = (state) => state.bloge.total
export const Loading = (state) => state.bloge.loading
export default blogeSlice.reducer