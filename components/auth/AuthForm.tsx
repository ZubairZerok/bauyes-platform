"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function AuthForm() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === "login") {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.refresh();
                router.push("/dashboard");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                setError("Check your email for the confirmation link.");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-bauyesLime border border-bauyesDark rounded-xl shadow-2xl overflow-hidden"
        >
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-bauyesDark/20">
                <button
                    onClick={() => setMode("login")}
                    className={cn(
                        "py-4 text-sm font-medium transition-colors relative",
                        mode === "login" ? "text-bauyesDark" : "text-bauyesDark/60 hover:text-bauyesDark"
                    )}
                >
                    Login
                    {mode === "login" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-bauyesDark"
                        />
                    )}
                </button>
                <button
                    onClick={() => setMode("signup")}
                    className={cn(
                        "py-4 text-sm font-medium transition-colors relative",
                        mode === "signup" ? "text-bauyesDark" : "text-bauyesDark/60 hover:text-bauyesDark"
                    )}
                >
                    Sign Up
                    {mode === "signup" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-bauyesDark"
                        />
                    )}
                </button>
            </div>

            <div className="p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-bold text-bauyesDark mb-2">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-bauyesDark/80 text-sm">
                        {mode === "login"
                            ? "Enter your credentials to access your workspace."
                            : "Join the Cyber-Agrarian Revolution."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-bauyesDark/80">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-bauyesDark/60 w-4 h-4" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/50 border border-bauyesDark/20 rounded-md py-2 pl-10 pr-4 text-bauyesDark placeholder:text-bauyesDark/50 focus:outline-none focus:border-bauyesDark focus:ring-1 focus:ring-bauyesDark transition-all text-sm"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-bauyesDark/80">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-bauyesDark/60 w-4 h-4" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/50 border border-bauyesDark/20 rounded-md py-2 pl-10 pr-4 text-bauyesDark placeholder:text-bauyesDark/50 focus:outline-none focus:border-bauyesDark focus:ring-1 focus:ring-bauyesDark transition-all text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-bauyesDark text-bauyesLime font-bold py-2.5 rounded-md hover:bg-bauyesDark/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {mode === "login" ? "Sign In" : "Create Account"}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
