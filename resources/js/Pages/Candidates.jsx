import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const emptyCandidate = {
    job_id: '',
    full_name: '',
    email: '',
    phone: '',
    location: '',
    source: 'Inbound',
    stage: 'applied',
    score: 0,
    resume_url: '',
    notes: '',
    applied_at: '',
};

const fieldClass =
    'mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

const stageOptions = ['applied', 'screening', 'interview', 'offer', 'hired'];

const toDateTimeLocal = (value) => {
    if (!value) {
        return '';
    }

    const date = new Date(value);
    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export default function Candidates({ candidates, jobs, selectedCandidate }) {
    const { flash } = usePage().props;
    const isEditing = Boolean(selectedCandidate);
    const initialData = selectedCandidate
        ? {
              ...emptyCandidate,
              ...selectedCandidate,
              job_id: selectedCandidate.job_id ?? selectedCandidate.job?.id ?? '',
              applied_at: toDateTimeLocal(selectedCandidate.applied_at),
          }
        : emptyCandidate;
    const form = useForm(initialData);

    useEffect(() => {
        form.setData(
            selectedCandidate
                ? {
                      ...emptyCandidate,
                      ...selectedCandidate,
                      job_id: selectedCandidate.job_id ?? selectedCandidate.job?.id ?? '',
                      applied_at: toDateTimeLocal(selectedCandidate.applied_at),
                  }
                : emptyCandidate,
        );
    }, [selectedCandidate]);

    const submit = (event) => {
        event.preventDefault();

        if (isEditing) {
            form.put(route('candidates.update', selectedCandidate.id), {
                preserveScroll: true,
            });
            return;
        }

        form.post(route('candidates.store'), {
            preserveScroll: true,
        });
    };

    const remove = () => {
        if (!isEditing) {
            return;
        }

        form.delete(route('candidates.destroy', selectedCandidate.id), {
            preserveScroll: true,
        });
    };

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
                {flash?.success && (
                    <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200">
                        {flash.success}
                    </div>
                )}

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                                    {isEditing ? 'Edit candidate' : 'New candidate'}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-white">
                                    {isEditing ? selectedCandidate.full_name : 'Add a candidate to the pipeline'}
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
                                <span className="text-sm text-slate-300">Role</span>
                                <select
                                    className={fieldClass}
                                    value={form.data.job_id}
                                    onChange={(event) => form.setData('job_id', event.target.value)}
                                >
                                    <option value="">Select a role</option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.id}>
                                            {job.title}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.job_id && <p className="mt-2 text-sm text-rose-300">{form.errors.job_id}</p>}
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Full name</span>
                                <input
                                    className={fieldClass}
                                    value={form.data.full_name}
                                    onChange={(event) => form.setData('full_name', event.target.value)}
                                />
                                {form.errors.full_name && <p className="mt-2 text-sm text-rose-300">{form.errors.full_name}</p>}
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Email</span>
                                <input
                                    type="email"
                                    className={fieldClass}
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                />
                                {form.errors.email && <p className="mt-2 text-sm text-rose-300">{form.errors.email}</p>}
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Phone</span>
                                <input
                                    className={fieldClass}
                                    value={form.data.phone}
                                    onChange={(event) => form.setData('phone', event.target.value)}
                                />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Location</span>
                                <input
                                    className={fieldClass}
                                    value={form.data.location}
                                    onChange={(event) => form.setData('location', event.target.value)}
                                />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Source</span>
                                <input
                                    className={fieldClass}
                                    value={form.data.source}
                                    onChange={(event) => form.setData('source', event.target.value)}
                                />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Stage</span>
                                <select
                                    className={fieldClass}
                                    value={form.data.stage}
                                    onChange={(event) => form.setData('stage', event.target.value)}
                                >
                                    {stageOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Score</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className={fieldClass}
                                    value={form.data.score}
                                    onChange={(event) => form.setData('score', event.target.value)}
                                />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Applied at</span>
                                <input
                                    type="datetime-local"
                                    className={fieldClass}
                                    value={form.data.applied_at}
                                    onChange={(event) => form.setData('applied_at', event.target.value)}
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Resume URL</span>
                                <input
                                    className={fieldClass}
                                    value={form.data.resume_url}
                                    onChange={(event) => form.setData('resume_url', event.target.value)}
                                />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Notes</span>
                                <textarea
                                    rows="4"
                                    className={fieldClass}
                                    value={form.data.notes}
                                    onChange={(event) => form.setData('notes', event.target.value)}
                                />
                            </label>

                            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {form.processing ? 'Saving...' : isEditing ? 'Update candidate' : 'Create candidate'}
                                </button>
                                {isEditing && (
                                    <Link href={route('candidates.index')} className="text-sm font-semibold text-slate-300 transition hover:text-white">
                                        Cancel edit
                                    </Link>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Pipeline</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Candidates moving through the funnel</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                {candidates.total} records
                            </div>
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full border-separate border-spacing-y-3">
                                <thead>
                                    <tr className="text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                                        <th className="px-4 py-2">Candidate</th>
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Stage</th>
                                        <th className="px-4 py-2">Score</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidates.data.map((candidate) => (
                                        <tr key={candidate.id} className="rounded-3xl bg-slate-950/60 text-sm text-slate-200">
                                            <td className="rounded-l-3xl px-4 py-4 font-semibold text-white">{candidate.full_name}</td>
                                            <td className="px-4 py-4">{candidate.job?.title ?? 'Unassigned'}</td>
                                            <td className="px-4 py-4 text-sky-300">{candidate.stage}</td>
                                            <td className="px-4 py-4 font-black text-orange-300">{candidate.score}</td>
                                            <td className="rounded-r-3xl px-4 py-4">
                                                <Link href={route('candidates.edit', candidate.id)} className="font-semibold text-white transition hover:text-sky-300">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {candidates.links.map((link) =>
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
