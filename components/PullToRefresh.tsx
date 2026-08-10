'use client';

import { type ReactNode, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProducts } from '@/lib/features/products/productsSlice';

type PullToRefreshProps = {
    children: ReactNode;
};

// Distancia en pixeles para activar el refresh.
const PULL_THRESHOLD = 80;

export default function PullToRefresh({
    children,
}: PullToRefreshProps) {
    const dispatch = useAppDispatch();

    const status = useAppSelector(
        (state) => state.products.status
    );

    // toque inicial
    const touchStartY = useRef<number | null>(null);
    // distancia
    const [pullDistance, setPullDistance] = useState(0);
    const handleTouchStart = (
        event: React.TouchEvent
    ) => {
        if (window.scrollY !== 0 || status === 'loading') {
            return;
        }

        touchStartY.current = event.touches[0].clientY;
    };

    // triggereamos la distancia del gesto
    const handleTouchMove = (
        event: React.TouchEvent
    ) => {
        if (touchStartY.current === null) {
            return;
        }

        const currentY = event.touches[0].clientY;
        const distance = currentY - touchStartY.current;

        // Solo cuentamos el deslizar hacia abajo, nunca hacia arriba.
        if (distance > 0) {
            setPullDistance(
                Math.min(distance, PULL_THRESHOLD)
            );
        }
    };

    // y actualizamos
    const handleTouchEnd = () => {
        if (pullDistance >= PULL_THRESHOLD) {
            dispatch(fetchProducts({page:0}));
        }

        touchStartY.current = null;
        setPullDistance(0);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Indicador mientras deslizamos. */}
            {pullDistance > 0 && (
                <div className="flex h-10 items-center justify-center text-sm text-zinc-500">
                    {pullDistance >= PULL_THRESHOLD
                        ? 'Release to refresh'
                        : 'Pull to refresh'}
                </div>
            )}

            {children}
        </div>
    );
}