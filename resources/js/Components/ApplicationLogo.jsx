export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 316 316"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-bg" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#F97316" />
                </linearGradient>
            </defs>
            <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#logo-bg)" />
            <path d="M20 20H33.5C38.2 20 42 23.8 42 28.5C42 31.9 40.1 34.8 37.3 36.1L43 44H34.9L30 37H26.6V44H20V20ZM26.6 26V31.9H33C34.6 31.9 35.9 30.6 35.9 29C35.9 27.3 34.6 26 33 26H26.6Z" fill="#020617" />
        </svg>
    );
}
