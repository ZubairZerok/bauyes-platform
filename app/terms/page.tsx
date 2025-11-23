import { Navbar } from "@/components/layout/Navbar";


export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-bauyesDark text-white py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-bauyes-green mb-8">
                        The Code of Conduct
                    </h1>

                    {/* Content */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                        <div className="space-y-6 prose prose-invert max-w-none">
                            <p className="text-gray-400 text-lg mb-8">
                                By using the BAUYES platform, you agree to follow our community guidelines.
                                Think of this as the foundational protocol for our ecosystem.
                            </p>

                            {/* Core Rules */}
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-bauyes-green/10 border border-bauyes-green/30 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl font-bold text-bauyes-green">1</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Don&apos;t hack the leaderboard
                                        </h2>
                                        <p className="text-gray-400">
                                            The XP system is built on trust. Gaming the system, creating fake accounts,
                                            or manipulating rankings will result in immediate disqualification and account suspension.
                                            Compete fairly, earn honestly.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-bauyes-green/10 border border-bauyes-green/30 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl font-bold text-bauyes-green">2</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Be respectful
                                        </h2>
                                        <p className="text-gray-400">
                                            Radical collaboration means respecting diverse perspectives.
                                            No harassment, discrimination, or hate speech of any kind.
                                            Disagreement is fine; disrespect is not. Treat others the way you&apos;d want to be treated.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-bauyes-green/10 border border-bauyes-green/30 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl font-bold text-bauyes-green">3</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            Own your failures
                                        </h2>
                                        <p className="text-gray-400">
                                            Failure is part of the journey. We celebrate experimentation and learning from mistakes.
                                            Don&apos;t blame others, don&apos;t make excuses—take responsibility, iterate, and improve.
                                            That&apos;s how you level up.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Terms */}
                            <div className="mt-12 pt-8 border-t border-zinc-700">
                                <h2 className="text-2xl font-bold text-bauyes-green mb-4">
                                    Additional Terms
                                </h2>
                                <ul className="space-y-3 text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-bauyes-green mt-1">▸</span>
                                        <span>You must be at least 16 years old to create an account</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bauyes-green mt-1">▸</span>
                                        <span>You are responsible for maintaining the security of your account credentials</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bauyes-green mt-1">▸</span>
                                        <span>You retain ownership of any projects or content you submit through the platform</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bauyes-green mt-1">▸</span>
                                        <span>We reserve the right to remove content that violates these terms</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bauyes-green mt-1">▸</span>
                                        <span>We may update these terms at any time; continued use constitutes acceptance</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Enforcement */}
                            <div className="mt-8 pt-8 border-t border-zinc-700">
                                <h2 className="text-2xl font-bold text-bauyes-green mb-4">
                                    Enforcement
                                </h2>
                                <p className="text-gray-400">
                                    Violations of these terms may result in warnings, temporary suspensions, or permanent bans.
                                    We review each case individually and aim to be fair but firm.
                                    If you believe a decision was made in error, contact us at{" "}
                                    <a href="mailto:yesofbau@gmail.com" className="text-bauyes-green hover:underline">
                                        yesofbau@gmail.com
                                    </a>.
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-zinc-700">
                                <p className="text-sm text-gray-500">
                                    Last updated: November 2025
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Questions? Reach out to{" "}
                                    <a href="mailto:yesofbau@gmail.com" className="text-bauyes-green hover:underline">
                                        yesofbau@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
