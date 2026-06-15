import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const interviews = [
    { time: '09:00', title: 'Screen - Maya Chen', details: 'Design loop with product and design lead' },
    { time: '10:30', title: 'Panel - Owen Patel', details: 'Backend interview with engineering panel' },
    { time: '13:00', title: 'Culture chat - Rina Ahmed', details: 'People team and hiring manager sync' },
    { time: '15:45', title: 'Offer prep - Lucas Miller', details: 'Comp review and approval workflow' },
];

export default function Scheduling() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Scheduling</p>
                    <h2 className="text-3xl font-black text-white">Interview coordination</h2>
                </div>
            }
        >
            <Head title="Scheduling" />

            <div className="recruit-shell py-8 lg:py-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        ['Automated invites', '88%'],
                        ['Conflicts resolved', '12'],
                        ['Avg. setup time', '9m'],
                    ].map(([label, value]) => (
                        <div key={label} className="surface-panel p-5">
                            <div className="text-sm text-slate-400">{label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Today</p>
                            <h3 className="mt-2 text-2xl font-bold text-white">Upcoming interview blocks</h3>
                        </div>

                        <div className="mt-5 space-y-3">
                            {interviews.map((interview) => (
                                <div key={interview.time} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-sky-300">{interview.time}</div>
                                            <div className="mt-1 font-semibold text-white">{interview.title}</div>
                                        </div>
                                        <div className="max-w-[10rem] text-right text-sm text-slate-400">{interview.details}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Round robin</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Availability routing</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                4 interviewers online
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((day) => (
                                <div key={day} className="rounded-3xl border border-white/5 bg-white/[0.03] p-4">
                                    <div className="text-sm font-semibold text-white">{day}</div>
                                    <div className="mt-3 space-y-2 text-sm text-slate-400">
                                        <div>09:00 - Panel A</div>
                                        <div>11:30 - Hiring manager</div>
                                        <div>15:00 - Final interview</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}