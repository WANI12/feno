<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InterviewEvent extends Model
{
    /** @use HasFactory<\Database\Factories\InterviewEventFactory> */
    use HasFactory;

    protected $table = 'recruit_interview_events';

    protected $fillable = [
        'candidate_id',
        'job_id',
        'recruiter_id',
        'title',
        'starts_at',
        'ends_at',
        'location',
        'meeting_url',
        'calendar_provider',
        'calendar_event_id',
        'status',
        'reminder_minutes',
        'reminder_at',
        'reminder_sent_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'reminder_at' => 'datetime',
            'reminder_sent_at' => 'datetime',
            'reminder_minutes' => 'integer',
        ];
    }

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recruiter_id');
    }
}