"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/yesofbau";

export function FacebookFeed() {
    return (
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-voidBlack to-voidBlack/95">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                        Latest from <span className="text-bauyesLime">BAUYES</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
                        Stay connected with our latest updates, events, and community highlights
                    </p>
                    <a
                        href={FACEBOOK_PAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-bauyesLime hover:text-bauyesLime/80 transition-colors font-semibold"
                    >
                        Follow us on Facebook
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>

                {/* Facebook Page Plugin */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 max-w-3xl w-full">
                        <div
                            className="fb-page"
                            data-href={FACEBOOK_PAGE_URL}
                            data-tabs="timeline"
                            data-width="500"
                            data-height="600"
                            data-small-header="false"
                            data-adapt-container-width="true"
                            data-hide-cover="false"
                            data-show-facepile="false"
                        >
                            <blockquote cite={FACEBOOK_PAGE_URL} className="fb-xfbml-parse-ignore">
                                <a href={FACEBOOK_PAGE_URL} className="text-bauyesLime hover:underline">
                                    BAUYES - BRAC University Association of Young Entrepreneurs and Startups
                                </a>
                            </blockquote>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
