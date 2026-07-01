import { useEffect, useState } from 'react';

export default function ThemeModeSelector({ className = '' }) {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const saved = window.localStorage.getItem('feno-theme');
        const nextMode = saved === 'dark' ? 'dark' : 'light';
        setMode(nextMode);
        document.documentElement.dataset.theme = nextMode;
        document.body.dataset.theme = nextMode;
    }, []);

    const toggleTheme = () => {
        const nextMode = mode === 'dark' ? 'light' : 'dark';
        setMode(nextMode);
        window.localStorage.setItem('feno-theme', nextMode);
        document.documentElement.dataset.theme = nextMode;
        document.body.dataset.theme = nextMode;
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className={`fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/95 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 ${className}`}
        >
            <span className="text-base">{mode === 'dark' ? '☀️' : '🌙'}</span>
            <span>{mode === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
    );
}
