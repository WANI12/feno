<?php

namespace App\Mail;

use App\Models\InterviewEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InterviewReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public InterviewEvent $event)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Interview reminder: ' . $this->event->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.interview-reminder',
            with: [
                'event' => $this->event,
            ],
        );
    }
}