<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\InterviewEvent;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $filters = [
            'job_id' => $request->integer('job_id') ?: 'all',
            'range' => $request->string('range', '30d')->toString(),
            'stage' => $request->string('stage', 'all')->toString(),
        ];

        [$startDate, $rangeLabel] = $this->resolveDateRange($filters['range']);

        $candidateBase = Candidate::query()
            ->when($filters['job_id'] !== 'all', fn ($query) => $query->where('job_id', $filters['job_id']))
            ->when($filters['stage'] !== 'all', fn ($query) => $query->where('stage', $filters['stage']))
            ->when($startDate, fn ($query) => $query->where('applied_at', '>=', $startDate));

        $candidates = (clone $candidateBase)->with('job')->get();

        $stageBreakdown = $candidates
            ->groupBy('stage')
            ->map(fn ($group, $stage) => [
                'label' => ucfirst($stage),
                'value' => $group->count(),
            ])
            ->values();

        $sourceBreakdown = $candidates
            ->groupBy('source')
            ->map(fn ($group, $source) => [
                'label' => $source,
                'value' => $group->count(),
            ])
            ->sortByDesc('value')
            ->values();

        $trend = $candidates
            ->groupBy(fn ($candidate) => $candidate->applied_at?->format('Y-m-d') ?? 'unknown')
            ->map(fn ($group, $date) => [
                'label' => $date,
                'value' => $group->count(),
            ])
            ->sortBy('label')
            ->values();

        $hiredCandidates = $candidates->filter(fn ($candidate) => $candidate->hired_at && $candidate->applied_at);
        $timeToHire = $hiredCandidates->isEmpty()
            ? 0
            : round($hiredCandidates->avg(fn ($candidate) => $candidate->applied_at->diffInDays($candidate->hired_at)), 1);

        $summary = [
            'activeJobs' => Job::query()->where('status', 'open')->count(),
            'candidates' => $candidates->count(),
            'interviews' => InterviewEvent::query()
                ->when($filters['job_id'] !== 'all', fn ($query) => $query->where('job_id', $filters['job_id']))
                ->when($startDate, fn ($query) => $query->where('starts_at', '>=', $startDate))
                ->count(),
            'offerRate' => $candidates->isEmpty() ? 0 : round(($candidates->where('stage', 'hired')->count() / $candidates->count()) * 100),
            'timeToHire' => $timeToHire,
            'rangeLabel' => $rangeLabel,
        ];

        $upcomingInterviews = InterviewEvent::with(['candidate.job', 'job'])
            ->when($filters['job_id'] !== 'all', fn ($query) => $query->where('job_id', $filters['job_id']))
            ->whereBetween('starts_at', [now(), now()->addDays(14)])
            ->orderBy('starts_at')
            ->limit(5)
            ->get();

        return Inertia::render('Analytics', [
            'filters' => $filters,
            'jobs' => Job::orderBy('title')->get(['id', 'title']),
            'summary' => $summary,
            'stageBreakdown' => $stageBreakdown,
            'sourceBreakdown' => $sourceBreakdown,
            'trend' => $trend,
            'upcomingInterviews' => $upcomingInterviews,
        ]);
    }

    private function resolveDateRange(string $range): array
    {
        return match ($range) {
            '7d' => [now()->subDays(7), 'Last 7 days'],
            '90d' => [now()->subDays(90), 'Last 90 days'],
            default => [now()->subDays(30), 'Last 30 days'],
        };
    }
}