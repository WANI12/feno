import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const navigation = [
        { name: 'Dashboard', href: route('dashboard') },
        { name: 'Candidates', href: route('candidates.index') },
        { name: 'Jobs', href: route('jobs.index') },
        { name: 'Scheduling', href: route('scheduling.index') },
        { name: 'Analytics', href: route('analytics.index') },
    ];

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="recruit-shell">
                    <div className="flex h-20 items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="block h-11 w-11 fill-current text-sky-300" />
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                                    Feno Recruit
                                </div>
                                <div className="text-sm text-slate-400">
                                    ATS, scheduling, analytics
                                </div>
                            </div>
                        </Link>

                        <div className="hidden items-center gap-2 lg:flex">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={item.href}
                                    active={route().current(item.href)}
                                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
                                >
                                    {item.name}
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
                                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium leading-4 text-slate-200 transition duration-150 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none"
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
                                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition duration-150 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none"
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
                                key={item.name}
                                href={item.href}
                                active={route().current(item.href)}
                            >
                                {item.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-slate-400">
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
                <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur">
                    <div className="recruit-shell py-6">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
