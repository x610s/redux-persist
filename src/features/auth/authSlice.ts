import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthData, LoginResponse } from "../../models/auth.model";


export const initialState: AuthData = {
    token: null,
    user_email: null,
    user_id: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state, action: PayloadAction<void>) => {
            state.token = null;
            state.user_email = null;
            state.user_id = null
        },
        logUser: (state, action: PayloadAction<LoginResponse>) => {
            state.token = action.payload.token;
            state.user_email = action.payload.user_email;
            state.user_id = action.payload.user_id;
        },
        setUser: (state, action: PayloadAction<LoginResponse>) => {
            state.token = action.payload.token;
            state.user_email = action.payload.user_email;
            state.user_id = action.payload.user_id;
        }
    }
})


export const { logUser, logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
