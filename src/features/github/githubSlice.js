import axios from "axios"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


/* It creates a new axios instance with the baseURL and headers. */
const github = axios.create({
    baseURL: process.env.VITE_GITHUB_URL,
    headers: {Authorization: `token ${process.env.VITE_GITHUB_TOKEN}`}
})

/* Initializing the state of the slice. */
const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
}

/* This is the first line of the `createAsyncThunk` function. */
export const searchUsers = createAsyncThunk("github/searchUsers", async (name, {rejectWithValue}) => {
    try {
        const params = new URLSearchParams({q: name})
        const {data} = await github.get(`/search/users?${params}`)
        return data.items
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return rejectWithValue(message)
    }
})

/* A thunk. It is a function that returns a function. */
export const getUserAndRepos = createAsyncThunk("github/user", async (login, {rejectWithValue}) => {
    try {
        const [user, repos] = await Promise.all([
            github.get(`/users/${login}`),
            github.get(`/users/${login}/repos`)
        ])
        return {user: user.data, repos: repos.data}
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return rejectWithValue(message)
    }
})

/* It creates a new slice. */
export const githubSlice = createSlice({
    name: "github",
    initialState,
    reducers: {
        resetUsers: (state, action) => {
            state.users = []
        }
    },
    extraReducers: {
        [searchUsers.pending]: (state) => {
            state.isLoading = true
        },
        [searchUsers.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.users = payload
        },
        [searchUsers.rejected]: () => console.log("rejected"),
        [getUserAndRepos.pending]: (state) => {
            state.isLoading = true
        },
        [getUserAndRepos.fulfilled]: (state, {payload}) => {
            state.isLoading = false
            state.user = payload.user
            state.repos = payload.repos
        },
        [getUserAndRepos.rejected]: () => console.log("rejected"),
    }
})

/* Exporting the `resetUsers` action from the slice. */
export const {resetUsers} = githubSlice.actions
/* Exporting the reducer. */
export default githubSlice.reducer