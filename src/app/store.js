import {configureStore} from "@reduxjs/toolkit"
import githubReducer from "../features/github/githubSlice"

/* Creating a store with the reducer we just created. */
export const store = configureStore({
    reducer: {
        github: githubReducer
    }
})