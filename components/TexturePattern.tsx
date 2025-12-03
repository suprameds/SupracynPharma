export default function TexturePattern() {
    return (
        <svg
            className="w-full h-full opacity-40 dark:opacity-10"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="medical-pattern"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    {/* Plus sign */}
                    <path
                        d="M20 15v10M15 20h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        className="text-gray-300 dark:text-gray-700"
                    />
                    {/* Small dot */}
                    <circle cx="2" cy="2" r="1" className="fill-gray-200 dark:fill-gray-800" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
    );
}
