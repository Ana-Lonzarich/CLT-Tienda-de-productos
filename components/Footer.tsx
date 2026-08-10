import Link from 'next/link';
import logoNavbarBlanco from '@/assets/LogoConNavbarBlanco.png';
import Image from "next/image";

const aboutLinks = [
    { label: 'Nosotros' },
    { label: 'Dónde ubicarnos' },
    { label: 'Preguntas Frecuentes' },
];

const legalLinks = [
    { label: 'Términos y condiciones' },
    { label: 'Políticas de privacidad' },
];

export default function Footer() {
    return (
        <footer className="bg-[#F5F5F5]">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    <Image
                        src={logoNavbarBlanco}
                        alt="Products App"
                        width={750}
                        height={140}
                        priority
                        className="h-10 w-auto"
                    />

                    {/* links informativos */}
                    <nav aria-label="Información">
                        <ul className="space-y-1">
                            {aboutLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href="#"
                                        className="block text-zinc-700 transition hover:text-zinc-950"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* links legales */}
                    <nav aria-label="Legal">
                        <ul className="space-y-1">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href="#"
                                        className="block text-zinc-700 transition hover:text-zinc-950"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 border-t border-zinc-300 pt-4 pb-2 text-center text-sm text-zinc-600">
                    © 2026 Ana Lonzarich
                </div>
            </div>
        </footer>
    );
}