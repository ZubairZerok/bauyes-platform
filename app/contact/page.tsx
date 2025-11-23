import { Navbar } from "@/components/layout/Navbar";

import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-bauyesDark text-white py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-bauyes-green mb-4">
                        Comms Channel
                    </h1>
                    <p className="text-gray-400 text-lg mb-12">
                        Have a question? Want to collaborate? Drop us a message.
                    </p>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left side: Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                                <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                    <MessageSquare className="text-bauyes-green" />
                                    Get in Touch
                                </h2>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-bauyes-green/10 border border-bauyes-green/30 rounded-lg flex items-center justify-center">
                                            <Mail className="text-bauyes-green" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                                Email
                                            </p>
                                            <a
                                                href="mailto:yesofbau@gmail.com"
                                                className="text-white hover:text-bauyes-green transition-colors text-lg font-medium"
                                            >
                                                yesofbau@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-bauyes-green/10 border border-bauyes-green/30 rounded-lg flex items-center justify-center">
                                            <MapPin className="text-bauyes-green" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                                                Location
                                            </p>
                                            <p className="text-white text-lg font-medium">
                                                BAU Campus
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                Agriculture & Environmental Sciences Department
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-white mb-3">
                                    Response Time
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    We typically respond to all inquiries within <strong className="text-bauyes-green">48 hours</strong>.
                                    For urgent matters, please mention it in your message subject line.
                                </p>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-white mb-3">
                                    Office Hours
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    <strong className="text-white">Sunday - Thursday:</strong> 9:00 AM - 5:00 PM
                                    <br />
                                    <strong className="text-white">Weekend:</strong> Closed
                                </p>
                            </div>
                        </div>

                        {/* Right side: Contact Form */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
                            <h2 className="text-2xl font-display font-bold text-white mb-6">
                                Send a Message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
