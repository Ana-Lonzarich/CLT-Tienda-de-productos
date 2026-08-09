import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

type FavoritesState = {
    items: Product[];
};

const initialState: FavoritesState = {
    items: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        // Si no existe el producto agregamos y si existe lo quitamos (findIndex).
        toggleFavorite: (state, action: PayloadAction<Product>) => {
            const product = action.payload;

            const index = state.items.findIndex(
                (item) => item.id === product.id
            );

            if (index === -1) {
                state.items.push(product);
            } else {
                state.items.splice(index, 1);
            }
        },
    },
});

export const {
    toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;