'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useAppSelector } from '@/lib/hooks';

export default function FavoritesPage() {
    // El appSelector guarda el producto completo
    const favoriteProducts = useAppSelector(
        (state) => state.favorites.items
    );

    return (
        <main className="mx-auto max-w-7xl px-6 py-8">
            <h1 className="text-3xl font-bold">
                Favoritos
            </h1>

            {/* Sin favoritos */}
            {favoriteProducts.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-zinc-500">
                        You don&apos;t have any favorite products yet.
                    </p>

                    <Link
                        href="/"
                        className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-white"
                    >
                        Explorar productos
                    </Link>
                </div>
            ) : (
                // Reutilizamos ProductCard
                <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {favoriteProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}