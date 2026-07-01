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
            className={`rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-900 ${className}`}
        >
            {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
}
