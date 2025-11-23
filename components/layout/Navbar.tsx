"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sprout, LogOut, User as UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/dashboard/events" },
    { name: "Squad", href: "/members" },
    { name: "Armory", href: "/resources" },
    { name: "Leaderboard", href: "/dashboard/leaderboard" },
    { name: "About", href: "/faq" },
];

type NavbarProps = {
    user?: User | null;
};

export function Navbar({ user }: NavbarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const { scrollY } = useScroll();

    // Transform values based on scroll position (0 to 100px)
    // Transform values based on scroll position (0 to 100px)
    const navBackground = useTransform(scrollY, [0, 100], ["rgba(6, 78, 59, 0.7)", "#022c22"]);
    const navFontWeight = useTransform(scrollY, [0, 100], [500, 700]);
    // Logo is always white now

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block w-[95%] max-w-4xl"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl" />
                    <motion.div
                        style={{ backgroundColor: navBackground }}
                        className="relative rounded-full border border-border backdrop-blur-xl shadow-lg shadow-primary/5 px-6 py-3"
                    >
                        <div className="flex items-center justify-between gap-8">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl group">
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white">
                                    <img src="/bauyes-logo.png" alt="BAUYES" className="w-full h-full object-cover" />
                                </motion.div>
                                <span className="text-white group-hover:text-[#bef264] transition-colors">
                                    BAUYES
                                </span>
                            </Link>

                            {/* Center Links */}
                            <div className="flex items-center gap-1">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link key={link.name} href={link.href} className="relative px-4 py-2 group">
                                            <motion.span
                                                style={{
                                                    fontWeight: navFontWeight
                                                }}
                                                className={`relative z-10 text-sm transition-colors text-white font-medium`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {link.name}
                                            </motion.span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-active"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bef264]"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <motion.div
                                                className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100"
                                                transition={{ duration: 0.2 }}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Right Side - Profile/Login */}
                            <div className="flex items-center gap-3">
                                {user ? (
                                    <div className="relative">
                                        <motion.button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center gap-2 group"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="w-9 h-9 rounded-full bg-[#bef264]/10 border border-border flex items-center justify-center group-hover:border-[#bef264]/60 transition-colors">
                                                <div className="text-white">
                                                    <UserIcon size={18} className="group-hover:text-[#bef264] transition-colors" />
                                                </div>
                                            </div>
                                            <motion.span
                                                style={{ fontWeight: navFontWeight }}
                                                className="text-xs bg-[#bef264]/10 px-2.5 py-1 rounded-full border border-border text-white"
                                            >
                                                XP: 0
                                            </motion.span>
                                        </motion.button>
                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-3 w-56 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden"
                                                >
                                                    <div className="px-4 py-3 border-b border-border">
                                                        <p className="text-sm text-bauyesDark font-medium truncate">{user.email}</p>
                                                    </div>
                                                    <div className="p-2">
                                                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-bauyesDark hover:text-bauyesLime hover:bg-bauyesLime/10 rounded-lg transition-colors" onClick={() => setIsProfileOpen(false)}>
                                                            <UserIcon size={16} className="text-bauyesDark" />
                                                            Dashboard
                                                        </Link>
                                                        <button onClick={() => { handleSignOut(); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                            <LogOut size={16} />
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link href="/login">
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2.5 bg-bauyesLime text-bauyesDark font-bold rounded-full text-sm shadow-[0_0_20px_rgba(190,242,100,0.5)] hover:shadow-[0_0_40px_rgba(190,242,100,0.8)] transition-all">
                                            Login / Join
                                        </motion.button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Navbar */}
            <motion.nav
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 md:hidden bg-card/80 backdrop-blur-md border-b border-border"
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/" className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white">
                            <img src="/bauyes-logo.png" alt="BAUYES" className="w-full h-full object-cover" />
                        </div>
                        BAUYES
                    </Link>
                    <div className="flex items-center gap-2">
                        <motion.button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-muted-foreground hover:text-primary transition-colors" whileTap={{ scale: 0.9 }}>
                            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col items-center justify-center h-full px-6">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link key={link.name} href={link.href} onClick={() => setIsMobileOpen(false)} className={`block text-3xl font-display font-bold transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                                        {link.name}
                                    </Link>
                                );
                            })}
                            {user ? (
                                <>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                                        <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="block text-2xl font-medium text-muted-foreground hover:text-primary transition-colors">
                                            Dashboard
                                        </Link>
                                    </motion.div>
                                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                                        <button onClick={() => { handleSignOut(); setIsMobileOpen(false); }} className="text-xl font-medium text-red-500 hover:text-red-400 transition-colors">
                                            Sign Out
                                        </button>
                                    </motion.div>
                                </>
                            ) : (
                                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="pt-4">
                                    <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full text-lg shadow-[0_0_30px_rgba(190,242,100,0.4)] transition-all">
                                            Login / Join
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
