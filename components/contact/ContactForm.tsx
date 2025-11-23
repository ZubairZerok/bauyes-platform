"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate form submission (you can integrate with an actual API later)
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                </label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-bauyesGreen focus:ring-bauyesGreen"
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-bauyesGreen focus:ring-bauyesGreen"
                />
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                </label>
                <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-bauyesGreen focus:ring-bauyesGreen resize-none"
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-bauyesGreen hover:bg-bauyesGreen/90 text-bauyesDark font-bold py-6 text-lg transition-all flex items-center justify-center gap-2"
            >
                {status === "submitting" ? (
                    "Sending..."
                ) : status === "success" ? (
                    "✓ Message Sent!"
                ) : (
                    <>
                        Send Message
                        <Send size={20} />
                    </>
                )}
            </Button>

            {/* Success Message */}
            {status === "success" && (
                <p className="text-bauyesGreen text-sm text-center">
                    Thanks for reaching out! We&apos;ll get back to you soon.
                </p>
            )}

            {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again or email us directly.
                </p>
            )}
        </form>
    );
}
