import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';
import {
    getProducts,
    searchProducts,
} from '@/lib/api';

// cantidad de items x pagina
const DEFAULT_PAGE_SIZE = 24;

type ProductsStatus =
    | 'idle'
    | 'loading'
    | 'succeeded'
    | 'failed';

type ProductsState = {
    items: Product[];
    status: ProductsStatus;
    error: string | null;
    page: number;
    totalPages: number;
    rehydrated: boolean;
};

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
    page: 0,
    totalPages: 1,
    rehydrated: false,
};

// Thunk de búsqueda: llamamos searchProducts(query)
export const fetchProductsBySearch = createAsyncThunk(
    'products/fetchProductsBySearch',
    async (query: string, { rejectWithValue }) => {
        try {
            return await searchProducts(query);
        } catch {
            return rejectWithValue(
                'No pudimos buscar los productos.'
            );
        }
    }
);

// Thunk del listado paginado
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (
        {
            page = 0,
            limit = DEFAULT_PAGE_SIZE,
        }: {
            page?: number;
            limit?: number;
        } = {}
    ) => {
        const skip = page * limit;

        const response = await getProducts(limit, skip);

        return {
            ...response,
            page,
        };
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // -------------------------
            // buscamos los productos
            // -------------------------

            .addCase(
                fetchProductsBySearch.pending,
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )

            .addCase(
                fetchProductsBySearch.fulfilled,
                (state, action) => {
                    state.status = 'succeeded';
                    state.items = action.payload.products;
                    state.page = 0;
                    state.totalPages = 1;
                }
            )

            .addCase(
                fetchProductsBySearch.rejected,
                (state, action) => {
                    state.status = 'failed';
                    state.error =
                        (action.payload as string) ??
                        'No pudimos buscar los productos.';
                }
            )

            // -------------------------
            // rehidrtamos
            // -------------------------
            .addCase('persist/REHYDRATE', (state) => {
                state.rehydrated = true;
            })

            // -------------------------
            // listado de prductos
            // -------------------------

            .addCase(
                fetchProducts.pending,
                (state, action) => {
                    state.status = 'loading';
                    state.error = null;
                    if (action.meta.arg.page === 0) {
                        state.items = [];
                    }
                }
            )

            .addCase(
                fetchProducts.fulfilled,
                (state, action) => {
                    state.status = 'succeeded';
                    state.error = null;
                    state.items = action.payload.products;
                    state.page = action.payload.page;
                    const requestedLimit =
                        action.meta.arg.limit ?? DEFAULT_PAGE_SIZE;

                    state.totalPages = Math.ceil(
                        action.payload.total / requestedLimit
                    );
                }
            )

            .addCase(
                fetchProducts.rejected,
                (state, action) => {
                    state.status = 'failed';
                    state.error =
                        (action.payload as string) ??
                        'No pudimos cargar los productos.';
                }
            );
    },
});

export default productsSlice.reducer;
