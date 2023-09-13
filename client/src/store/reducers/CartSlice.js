import {createSlice} from "@reduxjs/toolkit";

let initialState = [];

const cartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers:{
        add(state,action)
        {
            state.push(action.payload);
            console.log("func")
        },
        remove(state,action)
        {
            state = state.filter((item)=>item.id !== action.payload);
            return state;
        }
    }
})

export const {add,remove} = cartSlice.actions;

export default cartSlice.reducer;