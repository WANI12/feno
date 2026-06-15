import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { label: 'Products', href: route('products.index') },
    { label: 'Platform', href: route('platform.index') },
    { label: 'Resources', href: route('resources.index') },
    { label: 'Pricing', href: route('pricing.index') },
];

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.92),rgba(15,23,42,0.98))]" />
            <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative">
                <header className="recruit-shell pt-6">
                    <div className="glass-panel flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                        <Link href={route('landing')} className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-orange-400 text-sm font-black text-slate-950 shadow-lg shadow-sky-500/20">
                                F
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Feno Recruit</p>
                                <p className="text-sm text-slate-400">ATS, scheduling, analytics</p>
                            </div>
                        </Link>

                        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                            {navItems.map((item) => (
                                <Link key={item.label} href={item.href} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white">
                                    {item.label}
                                </Link>
                            ))}
                            <Link href={route('hiring.index')} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                                We&apos;re Hiring
                            </Link>
                            <Link href={route('contact.index')} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                                Get in touch
                            </Link>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
                                    Open app
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
                                        Start free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="recruit-shell pb-16 pt-10 lg:pt-14">{children}</main>
            </div>
        </div>
    );
}
