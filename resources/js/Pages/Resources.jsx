import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const resources = [
    {
        title: 'Hiring playbooks',
        description: 'Reusable guides for intake, interviews, and offer decision-making.',
    },
    {
        title: 'Templates',
        description: 'Scorecards, feedback prompts, and role kickoff checklists for teams.',
    },
    {
        title: 'Product updates',
        description: 'A steady stream of improvements across ATS, scheduling, and analytics.',
    },
    {
        title: 'Help center',
        description: 'Answers for recruiters, hiring managers, and admins in one place.',
    },
];

export default function Resources() {
    return (
        <PublicLayout>
            <Head title="Resources" />

            <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                        Resources
                    </div>
                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white lg:text-7xl">
                        Guides, templates, and support for hiring teams.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
                        The resources hub is where teams can learn the platform, adopt best practices, and keep momentum during a hiring cycle.
                    </p>
                </div>

                <div className="surface-panel p-6 lg:p-8">
                    <div className="space-y-4">
                        {resources.map((resource) => (
                            <div key={resource.title} className="rounded-3xl border border-white/5 bg-slate-950/60 p-5">
                                <div className="text-sm font-semibold text-white">{resource.title}</div>
                                <p className="mt-3 text-sm leading-7 text-slate-400">{resource.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={route('contact.index')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                            Ask for help
                        </Link>
                        <Link href={route('pricing.index')} className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                            Compare plans
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
