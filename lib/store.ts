import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTransform, persistReducer } from 'redux-persist';
import type { Reducer } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import productsReducer from '@/lib/features/products/productsSlice';
import favoritesReducer from '@/lib/features/favorites/favoritesSlice';

const paginationTransform = createTransform(
    (inboundState: { page: number; totalPages: number }) => ({
        page: inboundState.page,
        totalPages: inboundState.totalPages,
    }),
    null,
    { whitelist: ['products'] }
);

// Config de persistencia: clave "products-app", persiste productos y favoritos
const persistConfig = {
    key: 'products-app',
    storage,
    whitelist: ['products', 'favorites'],
    transforms: [paginationTransform],
    timeout: 0,
};

// Unimos los slices de productos y favoritos.
const rootReducer = combineReducers({
    products: productsReducer,
    favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer as unknown as Reducer<RootState>
);

// Fabricamos el store
export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        'persist/PERSIST',
                        'persist/REHYDRATE',
                        'persist/REGISTER',
                    ],
                },
            }),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];