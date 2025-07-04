import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Components/axios";

const initialState = {
    user: null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    loading: false,
};

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
        const res = await api.get("/auth/get-current-user");
        return res.data.user;
        } catch (err) {
        return rejectWithValue("Failed to fetch current user");
        }
    }
    );

    const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
        },
        logout: (state) => {
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        })
        .addCase(fetchCurrentUser.rejected, (state) => {
            state.loading = false;
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("isLoggedIn");
        });
    },
    });

    export const { loginSuccess, logout } = authSlice.actions;
    export default authSlice.reducer;
