import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    getProducts: (state, action) => {
      // console.log("step 2")
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.total = action.payload.totalAmount;
    },
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price;
      state.products.splice(
        state.products.findIndex((item) => {
          return (
            item._id === action.payload.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
          );
        }),
        1
      );
    },
    removeAllItems: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
    },
    updateQuantity: (state, action) => {
      if(action.payload.type === "inc")
      {
        state.total = state.total + state.products[action.payload.index].price;
      }
      else if(action.payload.type === "dec")
    {
      state.total = state.total -state.products[action.payload.index].price;
    } 
      state.products[action.payload.index] = {...state.products[action.payload.index],quantity:action.payload.quantity};
    },
  },
});

export const {
  addProduct,
  getProducts,
  removeProduct,
  removeAllItems,
  updateQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
