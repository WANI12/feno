import { Head, Link } from '@inertiajs/react';

const metrics = [
    { value: '28%', label: 'faster time-to-hire' },
    { value: '4.9/5', label: 'hiring team satisfaction' },
    { value: '12m', label: 'median interview setup' },
];

const features = [
    {
        title: 'ATS built for speed',
        description:
            'Track every job, candidate, and interview stage in one place with structured pipelines and clear ownership.',
    },
    {
        title: 'Scheduling without ping pong',
        description:
            'Coordinate interview panels, round-robin routing, and availability windows from a single scheduling layer.',
    },
    {
        title: 'Analytics that surface decisions',
        description:
            'See funnel conversion, time-to-hire, source quality, and recruiter throughput without spreadsheet exports.',
    },
    {
        title: 'Automation with a human touch',
        description:
            'Trigger scorecards, reminders, and handoffs automatically while keeping candidate communication personal.',
    },
];

const pipeline = [
    ['Sourced', '126'],
    ['Screening', '42'],
    ['Interviews', '19'],
    ['Offers', '6'],
];

export default function Landing({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Feno Recruit" />

            <div className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_32%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.98))]" />
                <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative">
                    <header className="recruit-shell pt-6">
                        <div className="glass-panel flex items-center justify-between px-5 py-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-orange-400 text-sm font-black text-white shadow-lg shadow-sky-500/20">
                                    F
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                                        Feno Recruit
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        ATS, scheduling, analytics
                                    </p>
                                </div>
                            </Link>

                            <div className="flex items-center gap-3">
                                <Link href={route('products.index')} className="hidden rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-slate-900 md:inline-flex">
                                    Products
                                </Link>
                                <Link href={route('platform.index')} className="hidden rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-slate-900 md:inline-flex">
                                    Platform
                                </Link>
                                <Link href={route('resources.index')} className="hidden rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-slate-900 md:inline-flex">
                                    Resources
                                </Link>
                                <Link href={route('pricing.index')} className="hidden rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-slate-900 md:inline-flex">
                                    Pricing
                                </Link>
                                <Link href={route('hiring.index')} className="hidden rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 md:inline-flex">
                                    We&apos;re Hiring
                                </Link>
                                <Link href={route('contact.index')} className="hidden rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 md:inline-flex">
                                    Get in touch
                                </Link>
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                                        Open app
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link href={route('login')} className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:text-slate-900">
                                                Log in
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link href={route('register')} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
                                                Start free
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </header>

                    <main className="recruit-shell pb-16 pt-14 lg:pt-20">
                        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                            <section className="space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600">
                                    Ashby-inspired recruiting OS
                                </div>

                                <div className="space-y-5">
                                    <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-900 lg:text-7xl">
                                        One system for hiring teams that need ATS, scheduling, and analytics.
                                    </h1>
                                    <p className="max-w-2xl text-lg leading-8 text-slate-700 lg:text-xl">
                                        Feno Recruit gives your team a polished command center for job requisitions, candidate pipelines, interview coordination, and reporting without stitching together separate tools.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link href={auth.user ? route('dashboard') : route('register')} className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
                                        Explore the platform
                                    </Link>
                                    <a href="#platform" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                                        See product pillars
                                    </a>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3">
                                    {metrics.map((metric) => (
                                        <div key={metric.label} className="surface-panel px-5 py-4">
                                            <div className="text-2xl font-black text-slate-900">{metric.value}</div>
                                            <div className="mt-1 text-sm text-slate-600">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="glass-panel relative overflow-hidden p-5">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                <div className="surface-panel p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-sky-500">Hiring pipeline</p>
                                            <h2 className="text-2xl font-bold text-slate-900">Live team snapshot</h2>
                                        </div>
                                        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                                            18 active roles
                                        </div>
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        {pipeline.map(([stage, count], index) => (
                                            <div key={stage} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-semibold text-slate-900">{stage}</span>
                                                    <span className="font-black text-sky-500">{count}</span>
                                                </div>
                                                <div className="mt-3 h-2 rounded-full bg-slate-200">
                                                    <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-orange-400" style={{ width: `${78 - index * 14}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                                            <div className="text-xs uppercase tracking-[0.25em] text-sky-600">Automation</div>
                                            <div className="mt-2 text-sm text-slate-700">
                                                Scorecards, reminders, and handoffs are triggered automatically.
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-orange-400/10 bg-orange-400/10 p-4">
                                            <div className="text-xs uppercase tracking-[0.25em] text-orange-600">Reporting</div>
                                            <div className="mt-2 text-sm text-slate-700">
                                                Funnel conversion, source quality, and recruiter throughput in one view.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section id="platform" className="mt-16 space-y-6 lg:mt-24">
                            <div className="max-w-3xl space-y-3">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">
                                    Platform pillars
                                </p>
                                <h2 className="text-3xl font-black text-slate-900 lg:text-5xl">
                                    Designed to feel easy at the start and powerful when your hiring motion gets serious.
                                </h2>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                {features.map((feature, index) => (
                                    <article key={feature.title} className="surface-panel p-5">
                                        <div className={`h-1.5 w-20 rounded-full ${index === 0 ? 'bg-sky-400' : index === 1 ? 'bg-orange-400' : index === 2 ? 'bg-emerald-400' : 'bg-fuchsia-400'}`} />
                                        <h3 className="mt-5 text-xl font-bold text-slate-900">{feature.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section id="operations" className="mt-16 grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:mt-24">
                            <article className="surface-panel p-6 lg:p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-sky-500">Operations</p>
                                        <h3 className="text-2xl font-bold text-slate-900">Structured hiring from source to offer</h3>
                                    </div>
                                    <Link href={auth.user ? route('dashboard') : route('login')} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                                        Open demo
                                    </Link>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                        <div className="text-sm font-semibold text-slate-700">ATS workflow</div>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            Track requisitions, candidate stages, approvals, and feedback in a single structured workflow.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                        <div className="text-sm font-semibold text-slate-700">Calendar orchestration</div>
                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            Build interview panels, book loops, and keep everyone aligned with automated reminders.
                                        </p>
                                    </div>
                                </div>
                            </article>

                            <aside className="surface-panel p-6 lg:p-8">
                                <p className="text-sm font-semibold text-orange-600">Insight loop</p>
                                <div className="mt-3 space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between text-sm text-slate-600">
                                            <span>Top source quality</span>
                                            <span>84%</span>
                                        </div>
                                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                                            <div className="h-2 w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-sm text-slate-600">
                                            <span>Hiring manager response</span>
                                            <span>96%</span>
                                        </div>
                                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                                            <div className="h-2 w-[96%] rounded-full bg-gradient-to-r from-sky-400 to-slate-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-sm text-slate-600">
                                            <span>Offer acceptance</span>
                                            <span>71%</span>
                                        </div>
                                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                                            <div className="h-2 w-[71%] rounded-full bg-gradient-to-r from-orange-400 to-amber-300" />
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </section>

                        <section className="mt-16 rounded-[32px] border border-slate-200 bg-gradient-to-r from-sky-400/5 via-white to-orange-400/5 p-8 text-center lg:mt-24 lg:p-12">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Ready to build your hiring stack</p>
                            <h2 className="mt-4 text-3xl font-black text-slate-900 lg:text-5xl">
                                Bring ATS, scheduling, and analytics into one product your team will actually use.
                            </h2>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <Link href={auth.user ? route('dashboard') : route('register')} className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
                                    Get started
                                </Link>
                                {canLogin && (
                                    <Link href={route('login')} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}