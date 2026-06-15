import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const emptyJob = {
    title: '',
    department: '',
    location: '',
    employment_type: 'full-time',
    status: 'open',
    openings: 1,
    salary_min: '',
    salary_max: '',
    hiring_manager: '',
    description: '',
};

const fieldClass =
    'mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

const employmentOptions = ['full-time', 'part-time', 'contract', 'temporary', 'internship'];
const statusOptions = ['open', 'paused', 'closed', 'filled'];

export default function Jobs({ jobs, selectedJob }) {
    const { flash } = usePage().props;
    const isEditing = Boolean(selectedJob);
    const form = useForm(selectedJob ? { ...emptyJob, ...selectedJob } : emptyJob);

    useEffect(() => {
        form.setData(selectedJob ? { ...emptyJob, ...selectedJob } : emptyJob);
    }, [selectedJob]);

    const submit = (event) => {
        event.preventDefault();

        if (isEditing) {
            form.put(route('jobs.update', selectedJob.id), {
                preserveScroll: true,
            });
            return;
        }

        form.post(route('jobs.store'), {
            preserveScroll: true,
        });
    };

    const remove = () => {
        if (!isEditing) {
            return;
        }

        form.delete(route('jobs.destroy', selectedJob.id), {
            preserveScroll: true,
        });
    };

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
                {flash?.success && (
                    <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
                        {flash.success}
                    </div>
                )}

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
                                    {isEditing ? 'Edit role' : 'New requisition'}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-white">
                                    {isEditing ? selectedJob.title : 'Add a job to the hiring plan'}
                                </h3>
                            </div>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={remove}
                                    className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/20"
                                >
                                    Delete
                                </button>
                            )}
                        </div>

                        <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Title</span>
                                <input className={fieldClass} value={form.data.title} onChange={(event) => form.setData('title', event.target.value)} />
                                {form.errors.title && <p className="mt-2 text-sm text-rose-300">{form.errors.title}</p>}
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Department</span>
                                <input className={fieldClass} value={form.data.department} onChange={(event) => form.setData('department', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Location</span>
                                <input className={fieldClass} value={form.data.location} onChange={(event) => form.setData('location', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Employment type</span>
                                <select className={fieldClass} value={form.data.employment_type} onChange={(event) => form.setData('employment_type', event.target.value)}>
                                    {employmentOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Status</span>
                                <select className={fieldClass} value={form.data.status} onChange={(event) => form.setData('status', event.target.value)}>
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Openings</span>
                                <input type="number" min="1" className={fieldClass} value={form.data.openings} onChange={(event) => form.setData('openings', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Salary min</span>
                                <input type="number" min="0" className={fieldClass} value={form.data.salary_min} onChange={(event) => form.setData('salary_min', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Salary max</span>
                                <input type="number" min="0" className={fieldClass} value={form.data.salary_max} onChange={(event) => form.setData('salary_max', event.target.value)} />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Hiring manager</span>
                                <input className={fieldClass} value={form.data.hiring_manager} onChange={(event) => form.setData('hiring_manager', event.target.value)} />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Description</span>
                                <textarea rows="5" className={fieldClass} value={form.data.description} onChange={(event) => form.setData('description', event.target.value)} />
                            </label>

                            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {form.processing ? 'Saving...' : isEditing ? 'Update job' : 'Create job'}
                                </button>
                                {isEditing && (
                                    <Link href={route('jobs.index')} className="text-sm font-semibold text-slate-300 transition hover:text-white">
                                        Cancel edit
                                    </Link>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Active hiring plan</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Open roles in the queue</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                {jobs.total} roles
                            </div>
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full border-separate border-spacing-y-3">
                                <thead>
                                    <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Department</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Openings</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobs.data.map((job) => (
                                        <tr key={job.id} className="rounded-3xl bg-slate-950/60 text-sm text-slate-200">
                                            <td className="rounded-l-3xl px-4 py-4 font-semibold text-white">{job.title}</td>
                                            <td className="px-4 py-4">{job.department}</td>
                                            <td className="px-4 py-4 text-sky-300">{job.status}</td>
                                            <td className="px-4 py-4 font-black text-orange-300">{job.openings}</td>
                                            <td className="rounded-r-3xl px-4 py-4">
                                                <Link href={route('jobs.edit', job.id)} className="font-semibold text-white transition hover:text-sky-300">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {jobs.links.map((link) =>
                                link.url ? (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className={`rounded-full border px-4 py-2 text-sm transition ${link.active ? 'border-sky-400 bg-sky-400/15 text-sky-200' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                                        preserveScroll
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                ) : (
                                    <span
                                        key={link.label}
                                        className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-500"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
