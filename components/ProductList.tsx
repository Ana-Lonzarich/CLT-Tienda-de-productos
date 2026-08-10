'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProducts } from '@/lib/features/products/productsSlice';
import Pagination from '@/components/Pagination';
import ProductSkeleton from '@/components/ProductSkeleton';
import PullToRefresh from '@/components/PullToRefresh';

import bannerDeBeneficios from '@/assets/bannerDeBeneficios.png';

export default function ProductList() {
    const dispatch = useAppDispatch();

    // obtenemos los estados completos de losproductos
    const { items, status, error, page, rehydrated } = useAppSelector(
        (state) => state.products
    );

    // Fetch inicial
    useEffect(() => {
        if (!rehydrated) return;
        if (status === 'idle') {
            dispatch(fetchProducts({ page }));
        }
    }, [rehydrated, status, page, dispatch]);

    //skeleton
    if ((status === 'idle' || status === 'loading') && items.length === 0) {
        return (
            <section className="py-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            </section>
        );
    }

    if (status === 'failed') {
        return (
            <section className="flex flex-col items-center gap-4 py-12 text-center">
                <h1 className="text-xl font-semibold">
                    No pudimos cargar los productos
                </h1>

                <p className="text-zinc-600">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => dispatch(fetchProducts({page:0}))}
                    className="rounded-lg bg-black px-5 py-2 text-white"
                >
                    Reintentar
                </button>
            </section>
        );
    }


    return (
        <PullToRefresh>
        <section>
            <Image
                src={bannerDeBeneficios}
                alt="Beneficios"
                width={1920}
                height={500}
                priority
                className="mx-auto w-full rounded-2xl object-cover"
            />
            <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        priority={index === 0}
                    />
                ))}
            </section>
            <Pagination />
        </section>
        </PullToRefresh>
    );
}
