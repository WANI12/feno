import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const channels = [
    ['Sales', 'sales@fenorecruit.com'],
    ['Support', 'support@fenorecruit.com'],
    ['Press', 'press@fenorecruit.com'],
];

export default function Contact() {
    return (
        <PublicLayout>
            <Head title="Get in touch" />

            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                        Get in touch
                    </div>
                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white lg:text-7xl">
                        Reach the team for a demo, pricing question, or product conversation.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
                        If you want to see the product in action, ask a question, or talk about fit for your team, this is the fastest way to start.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('pricing.index')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                            View pricing
                        </Link>
                        <Link href={route('products.index')} className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                            Explore products
                        </Link>
                    </div>
                </div>

                <div className="surface-panel p-6 lg:p-8">
                    <div className="space-y-4">
                        {channels.map(([label, value]) => (
                            <div key={label} className="rounded-3xl border border-white/5 bg-slate-950/60 p-5">
                                <div className="text-sm font-semibold text-slate-300">{label}</div>
                                <div className="mt-2 text-xl font-bold text-white">{value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-3xl border border-white/5 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
                        Prefer a faster path? Use the navigation button to jump straight here from anywhere on the public site.
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
