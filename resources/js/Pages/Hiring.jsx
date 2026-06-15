import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const roles = [
    ['Product designer', 'Help shape the hiring workflow experience.'],
    ['Frontend engineer', 'Build polished product surfaces in React and Tailwind.'],
    ['Backend engineer', 'Own the data layer, scheduling, and automation flows.'],
];

export default function Hiring() {
    return (
        <PublicLayout>
            <Head title="We\'re Hiring" />

            <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                        We&apos;re hiring
                    </div>
                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white lg:text-7xl">
                        Join the team building a better operating system for hiring.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
                        We care about product craft, clean systems, and building tools that hiring teams genuinely want to use every day.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('contact.index')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                            Get in touch
                        </Link>
                        <Link href={route('resources.index')} className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                            Read more
                        </Link>
                    </div>
                </div>

                <div className="surface-panel p-6 lg:p-8">
                    <div className="space-y-4">
                        {roles.map(([title, detail]) => (
                            <div key={title} className="rounded-3xl border border-white/5 bg-slate-950/60 p-5">
                                <div className="text-lg font-bold text-white">{title}</div>
                                <p className="mt-3 text-sm leading-7 text-slate-400">{detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
