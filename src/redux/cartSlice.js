import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    totalMrp: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += action.payload.price;
                existingItem.totalMrp += action.payload.mrp;
            } else {
                state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price, totalMrp: action.payload.mrp });
            }
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
            state.totalMrp += action.payload.mrp;
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    item.totalPrice -= item.price;
                    item.totalMrp -= item.mrp;
                } else {
                    state.items.splice(itemIndex, 1);
                }
                state.totalQuantity -= 1;
                state.totalPrice -= item.price;
                state.totalMrp -= item.mrp;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.totalMrp = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
