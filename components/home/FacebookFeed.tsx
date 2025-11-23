"use client";

import { motion } from "framer-motion";
import { ExternalLink, Facebook } from "lucide-react";

const FACEBOOK_PAGE_URL = "https://www.facebook.com/yesofbau";

export function FacebookFeed() {
    return (
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-voidBlack to-voidBlack">
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[100px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full mb-6">
                        <Facebook className="w-4 h-4 text-lime-400" />
                        <span className="text-lime-400 text-sm font-semibold">Follow Our Journey</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                        Latest from <span className="text-lime-400">BAUYES</span>
                    </h2>
                    <p className="text-zinc-300 text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
                        Bangladesh Agricultural University Youth Entrepreneurship Society
                    </p>
                    <p className="text-zinc-400 text-base max-w-2xl mx-auto mb-8">
                        Stay connected with our latest updates, events, and community highlights
                    </p>
                    <a
                        href={FACEBOOK_PAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-lg transition-all shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40"
                    >
                        <Facebook className="w-5 h-5" />
                        Follow on Facebook
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
                    <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm max-w-3xl w-full">
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
                                <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline">
                                    Bangladesh Agricultural University Youth Entrepreneurship Society (BAUYES)
                                </a>
                            </blockquote>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
