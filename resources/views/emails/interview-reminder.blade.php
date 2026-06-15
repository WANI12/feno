<!DOCTYPE html>
<html>
    <body style="font-family: Arial, sans-serif; background: #020617; color: #e2e8f0; padding: 24px;">
        <div style="max-width: 640px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 28px;">
            <h1 style="margin-top: 0; color: #f8fafc;">Interview reminder</h1>
            <p style="line-height: 1.7; color: #cbd5e1;">{{ $event->title }} is starting soon.</p>
            <p style="line-height: 1.7; color: #cbd5e1;">
                Candidate: {{ $event->candidate?->full_name }}<br>
                Role: {{ $event->job?->title }}<br>
                Starts: {{ optional($event->starts_at)->format('M j, Y g:i A') }}
            </p>
            @if ($event->meeting_url)
                <p><a href="{{ $event->meeting_url }}" style="color: #38bdf8;">Join meeting</a></p>
            @endif
        </div>
    </body>
</html>