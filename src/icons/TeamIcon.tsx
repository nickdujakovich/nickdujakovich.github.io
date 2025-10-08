interface TeamIconProps {
    width?: number;
    height?: number;
    className?: string;
}

export function TeamIcon({ width = 24, height = 24, className }: TeamIconProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            {/* Team leadership icon - leader with team */}
            {/* Leader (center, larger) */}
            <circle cx="12" cy="7" r="3.5" />
            <path d="M12 10.5c-2.5 0-4.5 2-4.5 4.5v3h9v-3c0-2.5-2-4.5-4.5-4.5z" />

            {/* Team members (smaller, on sides) */}
            <circle cx="6" cy="9" r="2" />
            <path d="M6 11c-1 0-2 1-2 2v2h4v-2c0-1-1-2-2-2z" />

            <circle cx="18" cy="9" r="2" />
            <path d="M18 11c-1 0-2 1-2 2v2h4v-2c0-1-1-2-2-2z" />

            {/* Leadership indicator - star above leader */}
            <path d="M12 3l1 2h2l-1.5 1.5L14.5 9l-2.5-1.5L9.5 9l1-2.5L9 5h2l1-2z" />
        </svg>
    );
}
