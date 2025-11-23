import { Navbar } from "@/components/layout/Navbar";


export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-bauyesDark text-white py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-bauyes-green mb-8">
                        Data Protocol
                    </h1>

                    {/* Terminal-style content */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 font-mono">
                        <div className="space-y-6 prose prose-invert max-w-none">
                            <p className="text-bauyes-green text-lg">
                                $ cat privacy_policy.txt
                            </p>

                            <div className="text-gray-300 space-y-4 leading-relaxed">
                                <p className="text-xl font-bold text-white">
                                    We collect XP, not cookies.
                                </p>

                                <p>
                                    At BAUYES, we believe in transparency and radical collaboration.
                                    Our data protocol is simple: we track your achievements, not your soul.
                                </p>

                                <h2 className="text-2xl font-bold text-bauyes-green mt-8 mb-4">
                                    Information We Collect
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>Your name, email, and university affiliation (when you register)</li>
                                    <li>Event registrations and attendance records</li>
                                    <li>Project submissions and URLs</li>
                                    <li>XP earned, badges unlocked, and leaderboard rankings</li>
                                    <li>Authentication data (managed securely via Supabase)</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-bauyes-green mt-8 mb-4">
                                    How We Use Your Data
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>To personalize your dashboard and track your progress</li>
                                    <li>To display leaderboards and celebrate achievements</li>
                                    <li>To send event updates and mission briefings (if you opt in)</li>
                                    <li>To improve the platform and create better experiences</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-bauyes-green mt-8 mb-4">
                                    What We Don&apos;t Do
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>We don&apos;t sell your data to third parties</li>
                                    <li>We don&apos;t track you across the web</li>
                                    <li>We don&apos;t spam you with ads or marketing emails</li>
                                    <li>We don&apos;t use invasive analytics or tracking pixels</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-bauyes-green mt-8 mb-4">
                                    Your Rights
                                </h2>
                                <p className="text-gray-400">
                                    You can request to view, update, or delete your data at any time.
                                    Contact us at <a href="mailto:yesofbau@gmail.com" className="text-bauyes-green hover:underline">yesofbau@gmail.com</a> and we&apos;ll handle it within 48 hours.
                                </p>

                                <h2 className="text-2xl font-bold text-bauyes-green mt-8 mb-4">
                                    Security
                                </h2>
                                <p className="text-gray-400">
                                    We use industry-standard encryption and secure authentication.
                                    Your passwords are hashed, your sessions are protected, and your data is stored securely.
                                </p>

                                <div className="mt-8 pt-6 border-t border-zinc-700">
                                    <p className="text-sm text-gray-500">
                                        Last updated: November 2025
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Questions? Reach out to <a href="mailto:yesofbau@gmail.com" className="text-bauyes-green hover:underline">yesofbau@gmail.com</a>
                                    </p>
                                </div>
                            </div>

                            <p className="text-bauyes-green mt-6">
                                $ _
                            </p>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
