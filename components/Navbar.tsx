'use client';

// Barra de navegación superior, pegajosa (sticky) al scroll.
// Cambia de logo y de colores al hacer scroll, incluye la búsqueda
// y un badge con la cantidad de favoritos.
// En mobile se compacta: la lupa despliega el buscador y el link de
// favoritos muestra solo el corazón (el texto queda para desktop).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SearchInput from '@/components/SearchInput';
import HeartIcon from "@/components/HeartIcon";
import { useAppSelector } from '@/lib/hooks';

import logoNavbarBlanco from '@/assets/LogoConNavbarBlanco.png';
import logoNavbarAzul from '@/assets/logoConNavBarAzul.png';

export default function Navbar() {
    // Indica si el usuario hizo scroll; dispara el cambio de estilos y logo.
    const [scrolled, setScrolled] = useState(false);

    // En mobile la búsqueda se abre con la lupa en vez de estar siempre visible.
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    // Contador para el badge: se deriva directo del slice de favoritos.
    const favoriteCount = useAppSelector(
        (state) => state.favorites.items.length
    );

    // Listener de scroll: actualiza "scrolled" según window.scrollY.
    // Se registra y limpia una sola vez (deps vacías).
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        // Cálculo inicial para el caso "ya scrolleado al montar".
        handleScroll();

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        // Clases condicionales: fondo azul + bordes ocultos cuando scrolled.
        <header
            className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
                scrolled
                    ? 'border-transparent bg-[#1E428A]'
                    : 'border-zinc-200 bg-white'
            }`}
        >
            {/* Logo a la izquierda; se intercambia según el fondo de la barra. */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
                <Link
                    href="/"
                    className="shrink-0 transition-opacity duration-300 hover:opacity-80"
                    aria-label="Products App"
                >
                    <Image
                        src={scrolled ? logoNavbarAzul : logoNavbarBlanco}
                        alt="Products App"
                        width={750}
                        height={140}
                        priority
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Búsqueda desktop: visible solo desde md en adelante. */}
                <div className="hidden flex-1 md:block md:max-w-md">
                    <SearchInput scrolled={scrolled} />
                </div>

                <div className="flex shrink-0 items-center gap-4 md:gap-6">
                    {/* Lupa mobile: abre/cierra el buscador desplegado debajo
                        de la barra. En desktop no se muestra. */}
                    <button
                        type="button"
                        onClick={() =>
                            setMobileSearchOpen((open) => !open)
                        }
                        aria-label={
                            mobileSearchOpen
                                ? 'Cerrar búsqueda'
                                : 'Buscar'
                        }
                        aria-expanded={mobileSearchOpen}
                        className={`shrink-0 transition-colors duration-300 md:hidden ${
                            scrolled
                                ? 'text-white hover:text-white/80'
                                : 'text-zinc-700 hover:text-black'
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>

                    <Link
                        href="/favorites"
                        aria-label="Favoritos"
                        className={`shrink-0 font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                            scrolled
                                ? 'text-white hover:text-white/80'
                                : 'text-zinc-700 hover:text-black'
                        }`}
                    >
                        {/* El texto solo se muestra en desktop; en mobile
                            queda únicamente el corazón (más compacto). */}
                        <span className="hidden md:inline">
                            Favoritos
                        </span>

                        {/* El badge solo aparece con al menos un favorito. */}
                        <span className="relative">
                            <HeartIcon filled={false} />
                            {favoriteCount > 0 && (
                                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FE3636] px-1 text-[10px] font-bold text-white">
                                    {favoriteCount}
                                </span>
                            )}
                        </span>
                    </Link>
                </div>
            </nav>

            {/* Buscador mobile: se despliega bajo la barra al tocar la lupa.
                md:hidden evita duplicarlo cuando ya está visible en desktop. */}
            {mobileSearchOpen && (
                <div className="border-t border-zinc-200 px-6 py-3 md:hidden">
                    <SearchInput scrolled={scrolled} />
                </div>
            )}
        </header>
    );
}