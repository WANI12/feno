import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const emptyEvent = {
    candidate_id: '',
    job_id: '',
    title: '',
    starts_at: '',
    ends_at: '',
    location: '',
    meeting_url: '',
    calendar_provider: 'internal',
    calendar_event_id: '',
    status: 'scheduled',
    reminder_minutes: 60,
    notes: '',
};

const fieldClass =
    'mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

const toDateTimeLocal = (value) => {
    if (!value) {
        return '';
    }

    const date = new Date(value);
    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export default function Scheduling({ events, candidates, jobs, selectedEvent }) {
    const { flash } = usePage().props;
    const isEditing = Boolean(selectedEvent);
    const initialData = selectedEvent
        ? {
              ...emptyEvent,
              ...selectedEvent,
              candidate_id: selectedEvent.candidate_id ?? selectedEvent.candidate?.id ?? '',
              job_id: selectedEvent.job_id ?? selectedEvent.job?.id ?? '',
              starts_at: toDateTimeLocal(selectedEvent.starts_at),
              ends_at: toDateTimeLocal(selectedEvent.ends_at),
          }
        : emptyEvent;
    const form = useForm(initialData);

    useEffect(() => {
        form.setData(
            selectedEvent
                ? {
                      ...emptyEvent,
                      ...selectedEvent,
                      candidate_id: selectedEvent.candidate_id ?? selectedEvent.candidate?.id ?? '',
                      job_id: selectedEvent.job_id ?? selectedEvent.job?.id ?? '',
                      starts_at: toDateTimeLocal(selectedEvent.starts_at),
                      ends_at: toDateTimeLocal(selectedEvent.ends_at),
                  }
                : emptyEvent,
        );
    }, [selectedEvent]);

    const submit = (event) => {
        event.preventDefault();

        if (isEditing) {
            form.put(route('interviews.update', selectedEvent.id), {
                preserveScroll: true,
            });
            return;
        }

        form.post(route('interviews.store'), {
            preserveScroll: true,
        });
    };

    const remove = () => {
        if (!isEditing) {
            return;
        }

        form.delete(route('interviews.destroy', selectedEvent.id), {
            preserveScroll: true,
        });
    };

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
                                    {isEditing ? 'Edit interview' : 'New interview'}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-white">
                                    {isEditing ? selectedEvent.title : 'Schedule a new calendar event'}
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
                            <label>
                                <span className="text-sm text-slate-300">Candidate</span>
                                <select className={fieldClass} value={form.data.candidate_id} onChange={(event) => form.setData('candidate_id', event.target.value)}>
                                    <option value="">Select a candidate</option>
                                    {candidates.map((candidate) => (
                                        <option key={candidate.id} value={candidate.id}>{candidate.full_name}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Role</span>
                                <select className={fieldClass} value={form.data.job_id} onChange={(event) => form.setData('job_id', event.target.value)}>
                                    <option value="">Select a role</option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.id}>{job.title}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Title</span>
                                <input className={fieldClass} value={form.data.title} onChange={(event) => form.setData('title', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Starts at</span>
                                <input type="datetime-local" className={fieldClass} value={form.data.starts_at} onChange={(event) => form.setData('starts_at', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Ends at</span>
                                <input type="datetime-local" className={fieldClass} value={form.data.ends_at} onChange={(event) => form.setData('ends_at', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Location</span>
                                <input className={fieldClass} value={form.data.location} onChange={(event) => form.setData('location', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Meeting URL</span>
                                <input className={fieldClass} value={form.data.meeting_url} onChange={(event) => form.setData('meeting_url', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Calendar provider</span>
                                <input className={fieldClass} value={form.data.calendar_provider} onChange={(event) => form.setData('calendar_provider', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Calendar event ID</span>
                                <input className={fieldClass} value={form.data.calendar_event_id} onChange={(event) => form.setData('calendar_event_id', event.target.value)} />
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Status</span>
                                <select className={fieldClass} value={form.data.status} onChange={(event) => form.setData('status', event.target.value)}>
                                    {['scheduled', 'rescheduled', 'completed', 'cancelled'].map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                <span className="text-sm text-slate-300">Reminder minutes</span>
                                <input type="number" min="5" max="1440" className={fieldClass} value={form.data.reminder_minutes} onChange={(event) => form.setData('reminder_minutes', event.target.value)} />
                            </label>

                            <label className="sm:col-span-2">
                                <span className="text-sm text-slate-300">Notes</span>
                                <textarea rows="4" className={fieldClass} value={form.data.notes} onChange={(event) => form.setData('notes', event.target.value)} />
                            </label>

                            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {form.processing ? 'Saving...' : isEditing ? 'Update interview' : 'Schedule interview'}
                                </button>
                                {isEditing && (
                                    <Link href={route('scheduling.index')} className="text-sm font-semibold text-slate-300 transition hover:text-white">
                                        Cancel edit
                                    </Link>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="surface-panel p-6 lg:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Scheduled events</p>
                                <h3 className="mt-2 text-2xl font-bold text-white">Interview calendar</h3>
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                {events.total} events
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {events.data.map((event) => (
                                <div key={event.id} className="rounded-3xl border border-white/5 bg-slate-950/60 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-sky-300">{new Date(event.starts_at).toLocaleString()}</div>
                                            <div className="mt-1 font-semibold text-white">{event.title}</div>
                                            <div className="mt-1 text-sm text-slate-400">{event.candidate?.full_name} • {event.job?.title}</div>
                                        </div>
                                        <Link href={route('interviews.edit', event.id)} className="text-sm font-semibold text-white transition hover:text-sky-300">
                                            Edit
                                        </Link>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{event.status}</span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Remind {event.reminder_minutes}m prior</span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">{event.calendar_provider}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {events.links.map((link) =>
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
