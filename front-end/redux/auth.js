import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";
export const fetchUserData = createAsyncThunk("/auth/fetchUserData", async (params) => {
    const {data} = await instance.post("/auth/login",params);
    return data;
});
export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
    const { data } = await instance.get("/auth/me");
    return data;
});
export const fetchRegister = createAsyncThunk("/auth/fetchRegister", async (params) => {
    const { data } = await instance.post("/auth/register",params);
    return data;
});
export const fetchAvatar = createAsyncThunk("/auth/fetchAvatar", async (imageUrl) => {
    const { data } = await instance.put("/user/image-update",imageUrl);
    return data;
});
const initialState = {
    data: null,
    status: 'loading'
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'loading';
            window.localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

            .addCase(fetchAuthMe.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

            .addCase(fetchRegister.pending, (state) => {
                state.data = null;
                state.status = "loading";
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "loaded";
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.data = null;
                state.status = "error";
            })

            .addCase(fetchAvatar.fulfilled, (state,action) => {
                state.data = action.payload;
            });
    },
});

export const isAuthSelector = (state) => state.auth.status === 'loaded';
export const userSelector = (state) => state.auth.data;

export const authRecuder = authSlice.reducer;

export const { logout } = authSlice.actions; 