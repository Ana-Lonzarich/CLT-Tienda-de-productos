'use client';

import { fetchProducts } from '@/lib/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Pagination() {
    const dispatch = useAppDispatch();

    // Estado de la paginación
    const { page, totalPages, status } = useAppSelector(
        (state) => state.products
    );

    if (status !== 'succeeded' || totalPages <= 1) {
        return null;
    }

    const activePage = page + 1;

    // calculamos el inicio y final de la pagina
    let start = Math.max(1, activePage - 2);
    const end = Math.min(totalPages, start + 4);
    if (end - start < 4) {
        start = Math.max(1, end - 4);
    }

    const pageNumbers = Array.from(
        { length: end - start + 1 },
        (_, index) => start + index
    );

    const goToPage = (pageIndex: number) => {
        dispatch(fetchProducts({ page: pageIndex }));

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <nav
            aria-label="Paginación"
            className="mt-8 flex w-full items-center justify-center gap-1"
        >
            {activePage > 1 && (
                <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    aria-label="Página anterior"
                    className="rounded-md border border-zinc-200 px-2 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-100"
                >
                    ← Anterior
                </button>
            )}

            {pageNumbers.map((pageNumber) => {
                const isActive = pageNumber === activePage;
                return (
                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() => goToPage(pageNumber - 1)}
                        aria-label={`Ir a la página ${pageNumber}`}
                        aria-current={isActive ? 'page' : undefined}
                        className={`rounded-md border px-3 py-1.5 text-sm transition ${
                            isActive
                                ? 'border-[#1E418C] bg-[#1E418C] font-medium text-white'
                                : 'border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-100'
                        }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {activePage < totalPages && (
                <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    aria-label="Página siguiente"
                    className="rounded-md border border-zinc-200 px-2 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-100"
                >
                    Siguiente →
                </button>
            )}
        </nav>
    );
}