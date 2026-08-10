'use client';

import Link from 'next/link';
import type { Product } from '@/types/product';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleFavorite } from '@/lib/features/favorites/favoritesSlice';
import Image from "next/image";
import HeartIcon from '@/components/HeartIcon';

type ProductCardProps = {
    product: Product;
    priority?: boolean;
};

export default function ProductCard({
    product,
    priority = false,
}: ProductCardProps) {
    const dispatch = useAppDispatch();

    // buscamos
    const isFavorite = useAppSelector((state) =>
        state.favorites.items.some(
            (item) => item.id === product.id
        )
    );

    // on / off un favorito
    const handleFavorite = () => {
        dispatch(toggleFavorite(product));
    };

    const discount = Math.round(
        product.discountPercentage
    );

    return (
        <article className="relative rounded-2xl bg-[#EDF6FF] p-3">
            <Link href={`/products/${product.id}`}>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-48 w-full rounded-xl object-cover"
                    width={500}
                    height={500}
                    priority={priority}
                />

                <h2 className="mt-4 font-semibold">
                    {product.title}
                </h2>

                <p className="mt-2">
                    ${product.price}
                </p>
            </Link>

            <button
                type="button"
                onClick={handleFavorite}
                aria-label={
                    isFavorite
                        ? `Remove ${product.title} from favorites`
                        : `Add ${product.title} to favorites`
                }
                className="absolute left-3 top-3 rounded-full bg-white p-2 shadow"
            >
                <HeartIcon filled={isFavorite} />
            </button>

            {/* Badge solo si es mayor a cero el favorito */}
            {discount > 0 && (
                <span className="absolute right-3 top-3 rounded-lg bg-[#BECE2E] px-2 py-1 text-sm font-bold text-white">
                    {discount}%
                </span>
            )}
        </article>
    );
}