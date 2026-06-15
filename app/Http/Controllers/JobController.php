<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Jobs', [
            'jobs' => Job::latest('posted_at')->paginate(8)->withQueryString(),
            'selectedJob' => null,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Jobs', [
            'jobs' => Job::latest('posted_at')->paginate(8)->withQueryString(),
            'selectedJob' => null,
        ]);
    }

    public function edit(Job $job): Response
    {
        return Inertia::render('Jobs', [
            'jobs' => Job::latest('posted_at')->paginate(8)->withQueryString(),
            'selectedJob' => $job,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Job::create($this->validateJob($request) + [
            'posted_at' => now(),
        ]);

        return redirect()->route('jobs.index')->with('success', 'Job created.');
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $job->update($this->validateJob($request));

        return redirect()->route('jobs.edit', $job)->with('success', 'Job updated.');
    }

    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Job removed.');
    }

    private function validateJob(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'department' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'employment_type' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'openings' => ['required', 'integer', 'min:1', 'max:100'],
            'salary_min' => ['nullable', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'min:0'],
            'hiring_manager' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
    }
}