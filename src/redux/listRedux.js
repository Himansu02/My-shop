import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    getList: (state, action) => {
      // console.log("step 2")
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
    },
    addToList: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
    },
    removeFromList: (state, action) => {
      state.quantity -= 1;
      state.products.splice(
        state.products.findIndex((item) => {
          return item._id === action.payload;
        }),
        1
      );
    },
    removeAllItemsFromList: (state) => {
      state.quantity = 0;
      state.products = [];
    },
  },
});

export const { addToList, getList, removeFromList, removeAllItemsFromList } =
  listSlice.actions;
export default listSlice.reducer;
