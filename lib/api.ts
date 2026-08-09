import axios from 'axios';
import type { Product, ProductsResponse } from '@/types/product';

export const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Listado paginado
export async function getProducts(
    limit = 10,
    skip = 0
): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('/products', {
        params: {
            limit,
            skip,
        },
    });

    return response.data;
}

// Detalle de un producto por id
export async function getProduct(
    id: number
): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);

    return response.data;
}

// Búsqueda, pasamos lo escrito al parametro q
export async function searchProducts(
    query: string
): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>(
        '/products/search',
        {
            params: {
                q: query,
            },
        }
    );

    return response.data;
}
