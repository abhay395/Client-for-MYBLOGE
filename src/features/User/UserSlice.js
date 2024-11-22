import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { featchUser, updateUser } from "./UserApi";

const initialState = {
    userData: null,
    loading: false,
    error: null,
};

export const featchUserAsync = createAsyncThunk(
    "user/featchUser",
    async () => {
        const response = await featchUser();
        console.log(response.data)
        return response.data
    }
)
export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async (userData)=>{
        console.log(userData)
        const response = await updateUser({userData})
        return response.data;
    }
)
// export const featchBlogeByIdAsync = createAsyncThunk(
//     "bloge/featchBlogeById",
//     async (id) => {
//         const response = await featchBlogeById(id);
//         return response.data
//     }
// )
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser:(state)=>{
            state.userData=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(featchUserAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(featchUserAsync.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.userData = action.payload
            })
            .addCase(featchUserAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.status = "pending"
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.userData = action.payload
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message
            })

    },
});

export const selectUser = (state) => state.user.userData
// export const selectSingleBloges = (state) => state.bloge.detailebloge
export const Status = (state) => state.user.status
export const {setUser} = userSlice.actions
export default userSlice.reducer