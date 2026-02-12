"use client";

interface HandDrawnDividerProps {
    className?: string;
    color?: string;
}

export default function HandDrawnDivider({ className = "", color = "currentColor" }: HandDrawnDividerProps) {
    return (
        <div className={`w-full h-8 my-8 flex items-center justify-center opacity-40 ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 20"
                preserveAspectRatio="none"
                className="overflow-visible"
            >
                <path
                    d="M0,10 Q50,5 100,10 T200,10 T300,10 T400,10"
                    stroke={color}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    style={{ vectorEffect: "non-scaling-stroke" }}
                >
                    <animate
                        attributeName="d"
                        dur="5s"
                        repeatCount="indefinite"
                        values="
                M0,10 Q50,5 100,10 T200,10 T300,10 T400,10;
                M0,10 Q50,15 100,10 T200,12 T300,8 T400,10;
                M0,10 Q50,5 100,10 T200,10 T300,10 T400,10
             "
                    />
                </path>
            </svg>
        </div>
    );
}
