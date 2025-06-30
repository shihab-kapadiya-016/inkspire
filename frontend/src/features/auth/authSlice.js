import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "false",
    loading:false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state,action) => {
            state.user = action.payload
            state.isLoggedIn = true
            localStorage.setItem("isLoggedIn", "true")
        },
        logout: (state) => {
            state.user = null,
            state.isLoggedIn = false
            localStorage.removeItem("isLoggedIn")
        }
    }
})

export const {loginSuccess, logout} = authSlice.actions
export default authSlice.reducer