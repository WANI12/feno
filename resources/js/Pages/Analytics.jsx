import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

const fieldClass =
    'mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

const maxValue = (items) => Math.max(...items.map((item) => item.value), 1);

export default function Analytics({ filters, jobs, summary, stageBreakdown, sourceBreakdown, trend, upcomingInterviews }) {
    const { flash } = usePage().props;

    const updateFilters = (nextFilters) => {
        router.get(route('analytics.index'), { ...filters, ...nextFilters }, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Analytics</p>
                    <h2 className="text-3xl font-black text-white">Recruiting insights that drive action</h2>
                </div>
            }
        >
            <Head title="Analytics" />

            <div className="recruit-shell py-8 lg:py-10">
                {flash?.success && (
                    <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
                        {flash.success}
                    </div>
                )}

                <section className="surface-panel p-6 lg:p-7">
                    <div className="grid gap-4 md:grid-cols-3">
                        <label>
                            <span className="text-sm text-slate-300">Job</span>
                            <select className={fieldClass} value={filters.job_id} onChange={(event) => updateFilters({ job_id: event.target.value })}>
                                <option value="all">All jobs</option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>{job.title}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span className="text-sm text-slate-300">Range</span>
                            <select className={fieldClass} value={filters.range} onChange={(event) => updateFilters({ range: event.target.value })}>
                                {[
                                    ['7d', 'Last 7 days'],
                                    ['30d', 'Last 30 days'],
                                    ['90d', 'Last 90 days'],
                                ].map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span className="text-sm text-slate-300">Stage</span>
                            <select className={fieldClass} value={filters.stage} onChange={(event) => updateFilters({ stage: event.target.value })}>
                                {['all', 'applied', 'screening', 'interview', 'offer', 'hired'].map((stage) => (
                                    <option key={stage} value={stage}>{stage}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </section>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {[
                        ['Active jobs', summary.activeJobs],
                        ['Candidates', summary.candidates],
                        ['Interviews', summary.interviews],
                        ['Offer rate', `${summary.offerRate}%`],
                        ['Time to hire', `${summary.timeToHire}d`],
                    ].map(([label, value]) => (
                        <div key={label} className="surface-panel p-5">
                            <div className="text-sm text-slate-400">{label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Funnel</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Stage conversion</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                {summary.rangeLabel}
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {stageBreakdown.map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-white">{item.label}</span>
                                        <span className="text-slate-400">{item.value}</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-white/10">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400" style={{ width: `${(item.value / maxValue(stageBreakdown)) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Sources</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Channel quality</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                Ranked by volume
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {sourceBreakdown.map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-white">{item.label}</span>
                                        <span className="text-slate-400">{item.value}</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-white/10">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: `${(item.value / maxValue(sourceBreakdown)) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Trend</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Applications over time</h3>
                            </div>
                        </div>

                        <div className="mt-6 grid items-end gap-3 sm:grid-cols-3 xl:grid-cols-6">
                            {trend.map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/5 bg-white/[0.03] p-4 text-center">
                                    <div className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</div>
                                    <div className="mt-4 flex h-40 items-end justify-center">
                                        <div className="w-10 rounded-2xl bg-gradient-to-t from-orange-400 via-sky-400 to-cyan-300" style={{ height: `${(item.value / maxValue(trend)) * 100}%` }} />
                                    </div>
                                    <div className="mt-3 text-lg font-black text-white">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Upcoming interviews</p>
                            <h3 className="mt-2 text-2xl font-bold text-white">Next scheduled events</h3>
                        </div>

                        <div className="mt-6 space-y-3">
                            {upcomingInterviews.map((event) => (
                                <div key={event.id} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="text-sm font-semibold text-sky-300">{new Date(event.starts_at).toLocaleString()}</div>
                                    <div className="mt-1 font-semibold text-white">{event.title}</div>
                                    <div className="mt-1 text-sm text-slate-400">{event.candidate?.full_name} • {event.job?.title}</div>
                                </div>
                            ))}
                            {upcomingInterviews.length === 0 && (
                                <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-4 text-sm text-slate-400">
                                    No upcoming interviews in the selected range.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
