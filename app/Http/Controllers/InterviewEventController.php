<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\InterviewEvent;
use App\Models\Job;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InterviewEventController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Scheduling', [
            'events' => InterviewEvent::with(['candidate.job', 'job', 'recruiter'])
                ->latest('starts_at')
                ->paginate(8)
                ->withQueryString(),
            'candidates' => Candidate::orderBy('full_name')->get(['id', 'full_name']),
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'selectedEvent' => null,
        ]);
    }

    public function create(): Response
    {
        return $this->index();
    }

    public function edit(InterviewEvent $interview): Response
    {
        return Inertia::render('Scheduling', [
            'events' => InterviewEvent::with(['candidate.job', 'job', 'recruiter'])
                ->latest('starts_at')
                ->paginate(8)
                ->withQueryString(),
            'candidates' => Candidate::orderBy('full_name')->get(['id', 'full_name']),
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'selectedEvent' => $interview->load(['candidate.job', 'job', 'recruiter']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateEvent($request);

        InterviewEvent::create([
            ...$validated,
            'recruiter_id' => $request->user()->id,
            'calendar_provider' => $validated['calendar_provider'] ?? 'internal',
            'calendar_event_id' => $validated['calendar_event_id'] ?? (string) CarbonImmutable::now()->timestamp . '-' . $request->user()->id,
            'reminder_at' => CarbonImmutable::parse($validated['starts_at'])->subMinutes((int) $validated['reminder_minutes']),
        ]);

        return redirect()->route('interviews.index')->with('success', 'Interview scheduled.');
    }

    public function update(Request $request, InterviewEvent $interview): RedirectResponse
    {
        $validated = $this->validateEvent($request);

        $interview->update([
            ...$validated,
            'recruiter_id' => $request->user()->id,
            'reminder_at' => CarbonImmutable::parse($validated['starts_at'])->subMinutes((int) $validated['reminder_minutes']),
            'reminder_sent_at' => $interview->starts_at->equalTo(CarbonImmutable::parse($validated['starts_at']))
                && (int) $interview->reminder_minutes === (int) $validated['reminder_minutes']
                ? $interview->reminder_sent_at
                : null,
        ]);

        return redirect()->route('interviews.edit', $interview)->with('success', 'Interview updated.');
    }

    public function destroy(InterviewEvent $interview): RedirectResponse
    {
        $interview->delete();

        return redirect()->route('interviews.index')->with('success', 'Interview removed.');
    }

    private function validateEvent(Request $request): array
    {
        return $request->validate([
            'candidate_id' => ['required', 'exists:recruit_candidates,id'],
            'job_id' => ['required', 'exists:recruit_jobs,id'],
            'title' => ['required', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['required', 'date', 'after:starts_at'],
            'location' => ['nullable', 'string', 'max:255'],
            'meeting_url' => ['nullable', 'url', 'max:2048'],
            'calendar_provider' => ['nullable', 'string', 'max:255'],
            'calendar_event_id' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'reminder_minutes' => ['required', 'integer', 'min:5', 'max:1440'],
            'notes' => ['nullable', 'string'],
        ]);
    }
}