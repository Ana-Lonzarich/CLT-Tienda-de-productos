import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreProvider from './StoreProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ProductList App',
    description: 'Product catalog built with Next.js and Redux Toolkit',
};

// StoreProvider da acceso al store a Navbar y páginas.
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body>
        <StoreProvider>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </StoreProvider>
        </body>
        </html>
    );
}