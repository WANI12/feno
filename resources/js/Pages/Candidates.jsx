import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const candidates = [
    { name: 'Maya Chen', role: 'Senior Product Designer', stage: 'Portfolio review', source: 'Referral', score: '92' },
    { name: 'Owen Patel', role: 'Backend Engineer', stage: 'Technical screen', source: 'LinkedIn', score: '88' },
    { name: 'Rina Ahmed', role: 'Talent Partner', stage: 'Hiring manager loop', source: 'Inbound', score: '95' },
    { name: 'Lucas Miller', role: 'Frontend Engineer', stage: 'Offer review', source: 'Referral', score: '90' },
];

export default function Candidates() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">ATS</p>
                    <h2 className="text-3xl font-black text-white">Candidate pipeline</h2>
                </div>
            }
        >
            <Head title="Candidates" />

            <div className="recruit-shell py-8 lg:py-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        ['New applicants', '126'],
                        ['In interviews', '41'],
                        ['Ready for offer', '9'],
                    ].map(([label, value]) => (
                        <div key={label} className="surface-panel p-5">
                            <div className="text-sm text-slate-400">{label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 surface-panel overflow-hidden p-6 lg:p-7">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                Review queue
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-white">
                                Candidates moving through the funnel
                            </h3>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                            18 awaiting feedback
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                                    <th className="px-4 py-2">Candidate</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Stage</th>
                                    <th className="px-4 py-2">Source</th>
                                    <th className="px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((candidate) => (
                                    <tr key={candidate.name} className="rounded-3xl bg-slate-950/60 text-sm text-slate-200">
                                        <td className="rounded-l-3xl px-4 py-4 font-semibold text-white">{candidate.name}</td>
                                        <td className="px-4 py-4">{candidate.role}</td>
                                        <td className="px-4 py-4 text-sky-300">{candidate.stage}</td>
                                        <td className="px-4 py-4">{candidate.source}</td>
                                        <td className="rounded-r-3xl px-4 py-4 font-black text-orange-300">{candidate.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}