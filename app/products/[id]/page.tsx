'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleFavorite } from '@/lib/features/favorites/favoritesSlice';
import { getProduct } from '@/lib/api';
import type { Product } from '@/types/product';
import HeartIcon from '@/components/HeartIcon';

export default function ProductDetailPage() {
    // obtenemos el id e la url con el params
    const params = useParams();
    const dispatch = useAppDispatch();
    const productId = Number(params.id);

    // producto en el liestado
    const storeProduct = useAppSelector((state) =>
        state.products.items.find(
            (item) => item.id === productId
        )
    );

    const [fetchedProduct, setFetchedProduct] =
        useState<Product | null>(null);

    const [loadFailed, setLoadFailed] = useState(false);

    const product = storeProduct ?? fetchedProduct;

    useEffect(() => {
        let cancelled = false;

        if (product || loadFailed) {
            return;
        }

        getProduct(productId)
            .then((data) => {
                if (!cancelled) setFetchedProduct(data);
            })
            .catch(() => {
                if (!cancelled) setLoadFailed(true);
            });

        return () => {
            cancelled = true;
        };
    }, [productId, product, loadFailed]);

    const isFavorite = useAppSelector((state) =>
        state.favorites.items.some(
            (item) => item.id === productId
        )
    );

    // Sin producto mostramos skeleton
    if (!product) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-2xl font-bold">
                    {loadFailed
                        ? 'No pudimos cargar el producto'
                        : 'Cargando producto...'}
                </h1>

                {loadFailed ? (
                    <Link
                        href="/"
                        className="mt-4 inline-block text-sm text-zinc-500 hover:text-black"
                    >
                        ← Volver a los productos
                    </Link>
                ) : (
                    /* Skeleton */
                    <div className="mt-6 flex animate-pulse gap-10 md:grid md:grid-cols-2">
                        <div className="h-96 w-full rounded-xl bg-zinc-200" />
                        <div className="space-y-4 py-4">
                            <div className="h-8 w-3/4 rounded bg-zinc-200" />
                            <div className="h-6 w-1/4 rounded bg-zinc-200" />
                            <div className="h-40 w-full rounded bg-zinc-200" />
                        </div>
                    </div>
                )}
            </main>
        );
    }

    // activamos el toggle de favoritos
    const handleFavorite = () => {
        dispatch(toggleFavorite(product));
    };

    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <Link
                href="/"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 bg-[#827F7E] text-white transition-colors duration-300"
            >
                ← Volver al listado de productos
            </Link>

            <section className="mt-8 grid gap-10 md:grid-cols-2">
                <div>
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full rounded-xl object-cover"
                        width={500}
                        height={500}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold">
                        {product.title}
                    </h1>

                    <p className="mt-4 text-2xl font-semibold">
                        ${product.price}
                    </p>

                    <p className="mt-6 leading-7 text-zinc-600">
                        {product.description}
                    </p>

                    <button
                        type="button"
                        onClick={handleFavorite}
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg px-6 py-3 bg-[#1E428A] text-white transition-colors duration-300"
                    >
                        <HeartIcon filled={isFavorite} />
                        {isFavorite
                            ? 'Eliminar favorito'
                            : 'Agregar a favorito'}
                    </button>
                </div>
            </section>
        </main>
    );
}