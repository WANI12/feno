import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const metrics = [
    { label: 'Open roles', value: '18', delta: '+3 this week' },
    { label: 'Candidates in play', value: '247', delta: '+19 today' },
    { label: 'Interviews scheduled', value: '36', delta: '12 this week' },
    { label: 'Offers pending', value: '6', delta: '2 at risk' },
];

const funnel = [
    { label: 'Applied', value: 92 },
    { label: 'Screened', value: 64 },
    { label: 'Interviewed', value: 49 },
    { label: 'Final round', value: 32 },
    { label: 'Offer', value: 22 },
];

const schedule = [
    { time: '09:00', title: 'Product designer loop', room: 'Meet with Mira, Josh, and Talent Ops' },
    { time: '11:15', title: 'Backend engineer screen', room: 'Samir + Olivia / Ruby on Rails role' },
    { time: '14:00', title: 'Hiring manager sync', room: 'Review feedback and scorecard trends' },
    { time: '16:30', title: 'Offer review', room: 'Finalize compensation and approval path' },
];

const activity = [
    'Candidate scorecard submitted for Senior Product Designer.',
    'Interview availability matched automatically for the Platform role.',
    'Source quality report updated for LinkedIn and referral channels.',
    'Offer packet approved for frontend engineering candidate.',
];

export default function RecruitDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
                        Hiring command center
                    </p>
                    <h2 className="text-3xl font-black leading-tight text-white">
                        Keep ATS, scheduling, and analytics in one visible workflow.
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="recruit-shell py-8 lg:py-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="surface-panel p-5">
                            <div className="text-sm font-medium text-slate-400">{metric.label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{metric.value}</div>
                            <div className="mt-2 text-sm text-sky-300">{metric.delta}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                                    Pipeline health
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-white">
                                    Candidate funnel by stage
                                </h3>
                            </div>
                            <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                                71% on target
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {funnel.map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <span className="font-semibold text-white">{item.label}</span>
                                        <span>{item.value}%</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-white/10">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400"
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                <div className="text-sm text-slate-400">Time to shortlist</div>
                                <div className="mt-2 text-3xl font-black text-white">2.1 days</div>
                            </div>
                            <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                <div className="text-sm text-slate-400">Candidate NPS</div>
                                <div className="mt-2 text-3xl font-black text-white">78</div>
                            </div>
                            <div className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                <div className="text-sm text-slate-400">Interview load</div>
                                <div className="mt-2 text-3xl font-black text-white">94%</div>
                            </div>
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                                Today
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-white">
                                Scheduled interviews
                            </h3>
                        </div>

                        <div className="mt-6 space-y-3">
                            {schedule.map((item) => (
                                <div key={item.time} className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-sky-300">{item.time}</div>
                                            <div className="mt-1 font-semibold text-white">{item.title}</div>
                                        </div>
                                        <div className="max-w-[10rem] text-right text-sm text-slate-400">{item.room}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-3xl border border-sky-400/10 bg-sky-400/10 p-4">
                            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
                                Automation running
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-200">
                                Scorecard reminders, candidate follow-ups, and interviewer nudges are active for every stage in the pipeline.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                Live activity
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-white">
                                Recent updates across the team
                            </h3>
                        </div>

                        <div className="mt-5 space-y-3">
                            {activity.map((item) => (
                                <div key={item} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                                    Analytics
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-white">
                                    Hiring performance by stage
                                </h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                Last 30 days
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            {[
                                ['Applied', '100%'],
                                ['Screened', '69%'],
                                ['Interviewed', '52%'],
                                ['Final', '34%'],
                                ['Offer', '24%'],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                    <div className="text-sm text-slate-400">{label}</div>
                                    <div className="mt-4 text-2xl font-black text-white">{value}</div>
                                    <div className="mt-4 h-32 rounded-2xl bg-[linear-gradient(180deg,rgba(56,189,248,0.18),rgba(249,115,22,0.18))]" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}