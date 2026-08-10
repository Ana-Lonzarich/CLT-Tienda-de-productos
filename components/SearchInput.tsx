'use client';

// Input de búsqueda del Navbar. Aplica debounce (400ms) para no golpear
// la API en cada tecla: si el campo queda vacío vuelve al listado normal.
// Recibe "scrolled" para adaptar el color del botón de la lupa:
// fondo azul sobre navbar blanca y fondo verde cuando la navbar es azul.
import { useEffect, useState } from 'react';

import { fetchProducts, fetchProductsBySearch } from '@/lib/features/products/productsSlice';
import { useAppDispatch } from '@/lib/hooks';

// Pausa antes de disparar la búsqueda: evita requests por cada tecleo.
const SEARCH_DELAY = 400;

export default function SearchInput({ scrolled }: { scrolled: boolean }) {
    const dispatch = useAppDispatch();

    // Estado local del texto tipeado; el input es controlado.
    const [query, setQuery] = useState('');

    // Cada cambio de texto re-planifica la búsqueda (clearTimeout + setTimeout).
    useEffect(() => {
        const trimmedQuery = query.trim();

        // Búsqueda vacía -> restablecemos el listado paginado normal.
        if (!trimmedQuery) {
            dispatch(fetchProducts({page:0}));
            return;
        }

        // Esperamos SEARCH_DELAY antes de buscar.
        const timeoutId = setTimeout(() => {
            dispatch(fetchProductsBySearch(trimmedQuery));
        }, SEARCH_DELAY);

        // Cleanup: si cambia el query antes del timeout, se cancela el anterior.
        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, dispatch]);

    return (
        <div className="flex items-center overflow-hidden rounded-lg border border-zinc-300 bg-white">
            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="¿Qué estás buscando?"
                aria-label="¿Qué estás buscando?"
                className="w-full px-4 py-2 text-sm outline-none"
            />

            <button
                type="button"
                aria-label="Buscar"
                className={`flex items-center px-3.5 py-2.5 text-white transition-colors duration-300 ${
                    scrolled ? 'bg-[#BECE2E]' : 'bg-[#1E428A]'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
            </button>
        </div>
    );
}