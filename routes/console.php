<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;
use App\Models\InterviewEvent;
use App\Mail\InterviewReminderMail;
use Carbon\CarbonImmutable;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('interviews:send-reminders', function () {
    $dueEvents = InterviewEvent::query()
        ->with(['candidate', 'job', 'recruiter'])
        ->whereNull('reminder_sent_at')
        ->whereNotNull('reminder_at')
        ->where('reminder_at', '<=', now())
        ->where('starts_at', '>', now())
        ->orderBy('reminder_at')
        ->get();

    $dueEvents->each(function (InterviewEvent $event): void {
        $recipients = array_filter([
            $event->candidate?->email,
            $event->recruiter?->email,
        ]);

        foreach ($recipients as $recipient) {
            Mail::to($recipient)->send(new InterviewReminderMail($event));
        }

        $event->forceFill([
            'reminder_sent_at' => CarbonImmutable::now(),
        ])->save();
    });

    $this->info(sprintf('Sent %d interview reminder(s).', $dueEvents->count()));
})->purpose('Send upcoming interview reminders');

Schedule::command('interviews:send-reminders')->everyMinute();
