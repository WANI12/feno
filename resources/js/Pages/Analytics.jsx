import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const bars = [
    { label: 'Referral', value: 92 },
    { label: 'LinkedIn', value: 76 },
    { label: 'Inbound', value: 68 },
    { label: 'Events', value: 44 },
];

export default function Analytics() {
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
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        ['Conversion', '24%'],
                        ['Time to hire', '31d'],
                        ['Source quality', '84%'],
                        ['Offer acceptance', '71%'],
                    ].map(([label, value]) => (
                        <div key={label} className="surface-panel p-5">
                            <div className="text-sm text-slate-400">{label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Source quality</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Channel performance</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                Last 90 days
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {bars.map((bar) => (
                                <div key={bar.label} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-white">{bar.label}</span>
                                        <span className="text-slate-400">{bar.value}%</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-white/10">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-orange-400" style={{ width: `${bar.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Insight loop</p>
                        <h3 className="mt-2 text-2xl font-bold text-white">What to do next</h3>

                        <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
                            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                Improve response time on hiring manager feedback to lower time-to-hire.
                            </div>
                            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                Increase referral sourcing for senior technical roles where conversion is highest.
                            </div>
                            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                Keep offer acceptance above 70% by flagging compensation risks earlier.
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}