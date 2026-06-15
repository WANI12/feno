import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const roles = [
    { title: 'Senior Product Designer', team: 'Design', applicants: 32, status: 'Active' },
    { title: 'Staff Backend Engineer', team: 'Engineering', applicants: 24, status: 'Active' },
    { title: 'Talent Acquisition Partner', team: 'People', applicants: 18, status: 'Closing soon' },
    { title: 'Customer Success Manager', team: 'Go-to-market', applicants: 11, status: 'New' },
];

export default function Jobs() {
    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">Job requisitions</p>
                    <h2 className="text-3xl font-black text-white">Open roles and hiring priority</h2>
                </div>
            }
        >
            <Head title="Jobs" />

            <div className="recruit-shell py-8 lg:py-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        ['Open requisitions', '18'],
                        ['Priority roles', '7'],
                        ['Offer approvals', '6'],
                        ['On-track roles', '14'],
                    ].map(([label, value]) => (
                        <div key={label} className="surface-panel p-5">
                            <div className="text-sm text-slate-400">{label}</div>
                            <div className="mt-3 text-4xl font-black text-white">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {roles.map((role) => (
                        <article key={role.title} className="surface-panel p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{role.team}</p>
                                    <h3 className="mt-2 text-2xl font-bold text-white">{role.title}</h3>
                                </div>
                                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                    {role.status}
                                </div>
                            </div>
                            <div className="mt-5 flex items-end justify-between text-sm text-slate-400">
                                <span>Applicants in pipeline</span>
                                <span className="text-2xl font-black text-white">{role.applicants}</span>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-white/10">
                                <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-orange-400" style={{ width: `${role.applicants * 2}%` }} />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}