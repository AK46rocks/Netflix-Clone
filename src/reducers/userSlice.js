import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null
    },
    reducers: {
        login:(state, action)=>{
           state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
}
);

export const {login, logout} = userSlice.actions;
export const userSelector = (state) => state.user.user; // state.name.(intialState.user)  
export default userSlice.reducer;