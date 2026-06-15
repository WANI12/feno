<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CandidateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Candidates', [
            'candidates' => Candidate::with('job')
                ->latest('applied_at')
                ->paginate(8)
                ->withQueryString(),
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'selectedCandidate' => null,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Candidates', [
            'candidates' => Candidate::with('job')
                ->latest('applied_at')
                ->paginate(8)
                ->withQueryString(),
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'selectedCandidate' => null,
        ]);
    }

    public function edit(Candidate $candidate): Response
    {
        return Inertia::render('Candidates', [
            'candidates' => Candidate::with('job')
                ->latest('applied_at')
                ->paginate(8)
                ->withQueryString(),
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'selectedCandidate' => $candidate->load('job'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateCandidate($request);

        Candidate::create([
            ...$validated,
            'recruiter_id' => $request->user()->id,
            'applied_at' => $validated['applied_at'] ?? now(),
        ]);

        return redirect()->route('candidates.index')->with('success', 'Candidate added.');
    }

    public function update(Request $request, Candidate $candidate): RedirectResponse
    {
        $validated = $this->validateCandidate($request, $candidate->id);

        $candidate->update([
            ...$validated,
            'recruiter_id' => $request->user()->id,
            'hired_at' => $validated['stage'] === 'hired' && ! $candidate->hired_at ? now() : $candidate->hired_at,
        ]);

        return redirect()->route('candidates.edit', $candidate)->with('success', 'Candidate updated.');
    }

    public function destroy(Candidate $candidate): RedirectResponse
    {
        $candidate->delete();

        return redirect()->route('candidates.index')->with('success', 'Candidate removed.');
    }

    private function validateCandidate(Request $request, ?int $candidateId = null): array
    {
        return $request->validate([
            'job_id' => ['required', 'exists:recruit_jobs,id'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'source' => ['required', 'string', 'max:255'],
            'stage' => ['required', 'string', 'max:255'],
            'score' => ['required', 'integer', 'min:0', 'max:100'],
            'resume_url' => ['nullable', 'url', 'max:2048'],
            'notes' => ['nullable', 'string'],
            'applied_at' => ['nullable', 'date'],
        ]);
    }
}