<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    /** @use HasFactory<\Database\Factories\JobFactory> */
    use HasFactory;

    protected $table = 'recruit_jobs';

    protected $fillable = [
        'title',
        'department',
        'location',
        'employment_type',
        'status',
        'openings',
        'salary_min',
        'salary_max',
        'hiring_manager',
        'description',
        'posted_at',
    ];

    protected function casts(): array
    {
        return [
            'openings' => 'integer',
            'salary_min' => 'integer',
            'salary_max' => 'integer',
            'posted_at' => 'datetime',
        ];
    }

    public function candidates(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    public function interviewEvents(): HasMany
    {
        return $this->hasMany(InterviewEvent::class);
    }
}