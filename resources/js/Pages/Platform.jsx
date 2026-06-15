import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const pillars = [
    ['Unified data model', 'Jobs, candidates, and interviews all live in one structured workflow.'],
    ['Scheduling layer', 'Calendar events and reminder automation keep interview loops moving.'],
    ['Shared visibility', 'Recruiters, hiring managers, and coordinators work from the same view.'],
    ['Fast decisions', 'Analytics surfaces bottlenecks and quality signals before hiring stalls.'],
];

export default function Platform() {
    return (
        <PublicLayout>
            <Head title="Platform" />

            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                        Platform
                    </div>
                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white lg:text-7xl">
                        A recruiting platform that keeps the whole workflow in sync.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
                        From role creation to offer approval, the platform is designed to replace fragmented ATS, calendar, and reporting tools.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('products.index')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                            Explore products
                        </Link>
                        <Link href={route('contact.index')} className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                            Talk to us
                        </Link>
                    </div>
                </div>

                <div className="surface-panel p-6 lg:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            ['ATS', 'Pipeline, scorecards, and candidate ownership'],
                            ['Scheduling', 'Interview blocks and automated reminders'],
                            ['Analytics', 'Conversion, source quality, and throughput'],
                            ['Security', 'Role-based access and clean audit paths'],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-3xl border border-white/5 bg-slate-950/60 p-5">
                                <div className="text-sm font-semibold text-sky-300">{title}</div>
                                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {pillars.map(([title, text]) => (
                    <article key={title} className="surface-panel p-5">
                        <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
                        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
                    </article>
                ))}
            </section>
        </PublicLayout>
    );
}
