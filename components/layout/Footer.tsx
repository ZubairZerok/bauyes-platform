import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative z-10 bg-card border-t border-border py-12 md:pl-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-4">BAUYES</h3>
                        <p className="text-muted-foreground text-sm">
                            The Cyber-Agrarian Platform empowering the next generation of growers.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-2">
                            <li><Link href="/dashboard/events" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">Events</Link></li>
                            <li><Link href="/dashboard/leaderboard" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">Leaderboard</Link></li>
                            <li><Link href="/faq" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Social / Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-[#bef264] hover:underline decoration-[#bef264] text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright - Lime background with white bold text */}
                <div className="mt-8 border-t border-border">
                    <div className="bg-primary py-1 px-6 rounded-b-lg mb-6">
                        <p className="text-primary-foreground text-xs font-bold text-center">
                            © {new Date().getFullYear()} BAUYES. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
