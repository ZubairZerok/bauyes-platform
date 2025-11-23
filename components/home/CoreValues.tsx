"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Sprout, Briefcase, Users, Rocket, Shield, LucideIcon } from "lucide-react";
import { MouseEvent } from "react";

const values = [
    {
        title: "Guts & Grit",
        description: "Failure is a data point, not a verdict.",
        icon: Sprout,
        className: "md:col-span-2",
    },
    {
        title: "Harvest to Hustle",
        description: "Soil to Sale. Lab to Market.",
        icon: Briefcase,
        className: "md:col-span-1",
    },
    {
        title: "Radical Collaboration",
        description: "Ego is the enemy. We build together.",
        icon: Users,
        className: "md:col-span-1",
    },
    {
        title: "Zero to One",
        description: "Create what doesn't exist.",
        icon: Rocket,
        className: "md:col-span-2",
    },
    {
        title: "Extreme Ownership",
        description: "We build our own systems.",
        icon: Shield,
        className: "md:col-span-3",
    },
];

function ValueCard({ title, description, icon: Icon, className }: { title: string, description: string, icon: LucideIcon, className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-border bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(190, 242, 100, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg text-primary">
                    <Icon size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
}

export function CoreValues() {
    return (
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Our Core Values</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">The principles that drive our revolution.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={value.className}
                        >
                            <ValueCard {...value} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
