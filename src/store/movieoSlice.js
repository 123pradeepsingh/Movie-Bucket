import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState ={
    bannerData : [],
    imageURl : ""
  
}

export const movieoSlice = createSlice({
    name : 'movie Bucket',
    initialState,
    reducers : {
        setBannerData : (state,action)=>{
            state.bannerData = action.payload
        },
        setImageURl :(state,action)=>{
            state.imageURl = action.payload
        }
    }
})

export const { setBannerData, setImageURl} = movieoSlice.actions

export default movieoSlice.reducer