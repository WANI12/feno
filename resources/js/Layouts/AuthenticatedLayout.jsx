import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ThemeModeSelector from '@/Components/ThemeModeSelector';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const navigation = [
        { label: 'Dashboard', href: route('dashboard'), active: 'dashboard' },
        { label: 'Candidates', href: route('candidates.index'), active: 'candidates.*' },
        { label: 'Jobs', href: route('jobs.index'), active: 'jobs.*' },
        { label: 'Scheduling', href: route('scheduling.index'), active: 'scheduling.index' },
        { label: 'Analytics', href: route('analytics.index'), active: 'analytics' },
    ];

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
                <div className="recruit-shell">
                    <div className="flex h-20 items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="block h-11 w-11 fill-current text-sky-300" />
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
                                    Feno Recruit
                                </div>
                                <div className="text-sm text-slate-600">
                                    ATS, scheduling, analytics
                                </div>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-2 lg:flex">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.label}
                                    href={item.href}
                                    active={route().current(item.active)}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="hidden items-center gap-4 sm:flex">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-full">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium leading-4 text-slate-700 transition duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 p-2 text-slate-700 transition duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' lg:hidden'
                    }
                >
                    <div className="recruit-shell space-y-1 pb-3 pt-2">
                        {navigation.map((item) => (
                            <ResponsiveNavLink
                                key={item.label}
                                href={item.href}
                                active={route().current(item.active)}
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-slate-900">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-slate-600">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-200 bg-slate-50/80 backdrop-blur">
                    <div className="recruit-shell py-6">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
