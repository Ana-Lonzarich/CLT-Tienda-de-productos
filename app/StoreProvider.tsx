'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { makeStore, type AppStore } from '@/lib/store';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    //creamos el store
    const [store] = useState<AppStore>(() => makeStore());

    useEffect(() => {
        const persistor = persistStore(store);
        return () => persistor.pause();
    }, [store]);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
