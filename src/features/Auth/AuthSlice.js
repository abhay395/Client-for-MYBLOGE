import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogiUser, SignInUser, checkUser } from "./AuthApi";

const initialState = {
    info: null,
    message: null,
    loading: false,
    error: null,
};

export const LogiUserAsync = createAsyncThunk(
    "auth/LogiUser",
    async (userdata) => {
        const response = await LogiUser(userdata);
        return response.data;
    }
);
export const SigninUserAsync = createAsyncThunk(
    "auth/SigninUser",
    async ({userdata}) => {
        const response = await SignInUser({userdata});
        return response.data;
    }
);
export const checkUserAsync = createAsyncThunk(
    "auth/checkUser",
    async () => {
        const response = await checkUser();
        console.log(response.data)
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LogiUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(LogiUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(LogiUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(SigninUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(SigninUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.info = action.payload;
            })
            .addCase(SigninUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(checkUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("action",action.payload);
                state.info = action.payload;
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const checkdata = (state) => state.auth.info;
export const authLoading = (state) => state.auth.loading;
export default authSlice.reducer;
// export const {} = authSlice.actions;