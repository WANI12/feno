import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const productCards = [
    {
        title: 'Applicant tracking',
        description: 'Structured pipelines, custom stages, and clear ownership for every open role.',
    },
    {
        title: 'Interview scheduling',
        description: 'Coordinate panels, availability, reminders, and calendar events from one place.',
    },
    {
        title: 'Hiring analytics',
        description: 'See source quality, conversion rates, and time-to-hire without exporting spreadsheets.',
    },
    {
        title: 'Automation',
        description: 'Trigger reminders, handoffs, and follow-ups without losing the human touch.',
    },
];

export default function Products() {
    return (
        <PublicLayout>
            <Head title="Products" />

            <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600">
                        Product suite
                    </div>
                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-900 lg:text-7xl">
                        One recruiting product for ATS, scheduling, and analytics.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-700 lg:text-xl">
                        Feno Recruit brings the core hiring workflow into one calm, high-signal workspace so recruiters and hiring teams can move faster.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('contact.index')} className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
                            Get in touch
                        </Link>
                        <Link href={route('pricing.index')} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                            View pricing
                        </Link>
                    </div>
                </div>

                <div className="glass-panel p-5">
                    <div className="surface-panel p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-sky-500">Product overview</p>
                                <h2 className="text-2xl font-bold text-slate-900">Built for lean teams and scaled hiring orgs</h2>
                            </div>
                            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                                Ready to demo
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {[
                                ['Live roles', '18'],
                                ['Open interviews', '41'],
                                ['Offer pipeline', '9'],
                                ['Reports', '12'],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="text-xs uppercase tracking-[0.25em] text-slate-600">{label}</div>
                                    <div className="mt-2 text-3xl font-black text-slate-900">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {productCards.map((card) => (
                    <article key={card.title} className="surface-panel p-5">
                        <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-sky-400 to-orange-400" />
                        <h3 className="mt-5 text-xl font-bold text-slate-900">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                    </article>
                ))}
            </section>
        </PublicLayout>
    );
}
