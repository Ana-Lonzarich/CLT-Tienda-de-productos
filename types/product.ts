export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    images: string[];
    discountPercentage: number;
}

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}