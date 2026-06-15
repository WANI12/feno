<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory;

    protected $table = 'recruit_candidates';

    protected $fillable = [
        'job_id',
        'recruiter_id',
        'full_name',
        'email',
        'phone',
        'location',
        'source',
        'stage',
        'score',
        'resume_url',
        'notes',
        'applied_at',
        'hired_at',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'integer',
            'applied_at' => 'datetime',
            'hired_at' => 'datetime',
        ];
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recruiter_id');
    }

    public function interviewEvents(): HasMany
    {
        return $this->hasMany(InterviewEvent::class);
    }
}