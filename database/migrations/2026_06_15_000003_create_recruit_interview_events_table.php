<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recruit_interview_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained('recruit_candidates')->cascadeOnDelete();
            $table->foreignId('job_id')->constrained('recruit_jobs')->cascadeOnDelete();
            $table->foreignId('recruiter_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->string('location')->nullable();
            $table->string('meeting_url')->nullable();
            $table->string('calendar_provider')->default('internal');
            $table->string('calendar_event_id')->nullable();
            $table->string('status')->default('scheduled');
            $table->unsignedTinyInteger('reminder_minutes')->default(60);
            $table->timestamp('reminder_at')->nullable();
            $table->timestamp('reminder_sent_at')->nullable();
            $table->longText('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recruit_interview_events');
    }
};