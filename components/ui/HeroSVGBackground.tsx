export function HeroSVGBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Animated SVG Pattern Background */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Lime Green Gradient */}
                    <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#bef264" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.25" />
                    </linearGradient>

                    {/* Organic Leaf Pattern */}
                    <pattern id="leafPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        {/* Leaf shape 1 */}
                        <path
                            d="M50,100 Q75,75 100,100 Q75,125 50,100 Z"
                            fill="url(#limeGradient)"
                            opacity="0.6"
                        />
                        {/* Leaf shape 2 */}
                        <path
                            d="M150,50 Q175,25 200,50 Q175,75 150,50 Z"
                            fill="url(#limeGradient)"
                            opacity="0.5"
                        />
                        {/* Small circles */}
                        <circle cx="25" cy="25" r="3" fill="#bef264" opacity="0.6" />
                        <circle cx="175" cy="175" r="2" fill="#22c55e" opacity="0.5" />
                    </pattern>

                    {/* Wavy Grid Pattern */}
                    <pattern id="wavyGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path
                            d="M0 30 Q15 20 30 30 T60 30"
                            stroke="#bef264"
                            strokeWidth="0.5"
                            fill="none"
                            opacity="0.35"
                        />
                        <path
                            d="M30 0 Q20 15 30 30 T30 60"
                            stroke="#22c55e"
                            strokeWidth="0.5"
                            fill="none"
                            opacity="0.35"
                        />
                    </pattern>
                </defs>

                {/* Background rectangles with patterns */}
                <rect width="100%" height="100%" fill="url(#leafPattern)" />
                <rect width="100%" height="100%" fill="url(#wavyGrid)" />

                {/* Animated floating shapes */}
                <g>
                    {/* Large organic blob 1 */}
                    <circle cx="20%" cy="30%" r="150" fill="#bef264" opacity="0.14">
                        <animate
                            attributeName="cy"
                            values="30%;35%;30%"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.14;0.18;0.14"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* Large organic blob 2 */}
                    <circle cx="80%" cy="70%" r="200" fill="#22c55e" opacity="0.10">
                        <animate
                            attributeName="cy"
                            values="70%;65%;70%"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* Medium blob */}
                    <ellipse cx="60%" cy="20%" rx="100" ry="150" fill="#bef264" opacity="0.12">
                        <animate
                            attributeName="rx"
                            values="100;120;100"
                            dur="7s"
                            repeatCount="indefinite"
                        />
                    </ellipse>
                </g>

                {/* Subtle radial gradient glow from center */}
                <defs>
                    <radialGradient id="centerGlow">
                        <stop offset="0%" stopColor="#bef264" stopOpacity="0.1" />
                        <stop offset="70%" stopColor="#bef264" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="50%" cy="50%" r="40%" fill="url(#centerGlow)" />
            </svg>

            {/* Additional overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
    );
}
