import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const plans = [
    {
        name: 'Starter',
        price: '$49',
        detail: 'For early hiring teams getting organized.',
        features: ['ATS workspace', 'Basic scheduling', 'Simple reports'],
    },
    {
        name: 'Growth',
        price: '$149',
        detail: 'For teams running multiple roles at once.',
        featured: true,
        features: ['Advanced pipeline', 'Calendar automation', 'Analytics filters'],
    },
    {
        name: 'Scale',
        price: 'Custom',
        detail: 'For distributed recruiting organizations.',
        features: ['Multi-team controls', 'Deeper reporting', 'Priority support'],
    },
];

export default function Pricing() {
    return (
        <PublicLayout>
            <Head title="Pricing" />

            <section className="space-y-6 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                    Pricing
                </div>
                <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white lg:text-7xl">
                    Flexible plans for teams that want one hiring system, not five tools.
                </h1>
                <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300 lg:text-xl">
                    Start small, then move up as the team grows. Each plan is built to keep the product simple while leaving room for scale.
                </p>
            </section>

            <section className="mt-14 grid gap-4 lg:grid-cols-3">
                {plans.map((plan) => (
                    <article
                        key={plan.name}
                        className={`surface-panel p-6 lg:p-8 ${plan.featured ? 'border border-sky-400/30 bg-sky-400/10' : ''}`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-400">{plan.detail}</p>
                            </div>
                            <div className="text-3xl font-black text-white">{plan.price}</div>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-slate-300">
                            {plan.features.map((feature) => (
                                <li key={feature} className="rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-3">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>

            <div className="mt-8 flex justify-center gap-3">
                <Link href={route('contact.index')} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                    Talk to sales
                </Link>
            </div>
        </PublicLayout>
    );
}
