import {
    createSlice
  }
  from "@reduxjs/toolkit";
  
  const basketSlice =
  createSlice({
  
    name:"basket",
  
    initialState:[],
  
    reducers:{
  
      insertProduct:
      (state, action) => {
  
        state.push(
          action.payload
        );
      },
  
      deleteProduct:
      (state, action) => {
  
        return state.filter(
          item =>
            item.productName !==
            action.payload
        );
      }
    }
  });
  
  export const {
    insertProduct,
    deleteProduct
  } = basketSlice.actions;
  
  export default basketSlice.reducer;