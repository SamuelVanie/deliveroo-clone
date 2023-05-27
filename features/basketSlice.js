import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exists in the basket... remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItem = (state) => state.basket.items;

export const selectBasketItemWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => {
  return state.basket.items.reduce((total, item) => total + item.price, 0);
};

export default basketSlice.reducer;
