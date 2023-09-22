import {createSlice} from "@reduxjs/toolkit";

const usersReducer = createSlice({
    name:"users",
    initialState:{
        user:{},
        token:{},
        profileUrl:[],
    },
    reducers:{
        changeUser(state,action){
            state.user = action.payload;
        },
        setUser(state,action){
            state.user = action.payload;
        },
        setToken(state,action){
            state.token = action.payload;
        },
        setProfileUrl(state,action){
            state.profileUrl.push(action.payload);
        }
    }
})

export const {changeName,setToken,setUser,setProfileUrl} = usersReducer.actions;
export default usersReducer.reducer;
