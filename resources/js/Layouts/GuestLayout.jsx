import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeSelector from '@/Components/ThemeModeSelector';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[color:var(--app-bg)] pt-6 text-[color:var(--text-primary)] sm:justify-center sm:pt-0">
            <div className="flex items-center gap-3">
                <Link href="/">
                    <ApplicationLogo className="mx-auto h-14 w-14 shadow-lg shadow-sky-500/20" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>

            <ThemeModeSelector />
        </div>
    );
}
