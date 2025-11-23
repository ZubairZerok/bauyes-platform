import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HeroSVGBackground } from "@/components/ui/HeroSVGBackground";

export default function FAQPage() {
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Hero Background */}
            <HeroSVGBackground />

            <main className="relative z-10 pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-4">
                        Knowledge Base
                    </h1>
                    <p className="text-muted-foreground text-lg mb-12">
                        Everything you need to know about the BAUYES ecosystem.
                    </p>

                    {/* FAQ Accordion */}
                    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-8">
                        <Accordion type="single" collapsible className="space-y-4">
                            <AccordionItem value="item-1" className="border-b border-border">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    How do I earn XP?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        There are multiple ways to earn XP in the BAUYES ecosystem:
                                    </p>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li>
                                            <strong className="text-foreground">Attend Events:</strong> Register and show up
                                            to workshops, hackathons, and talks to earn base XP rewards.
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Submit Projects:</strong> Complete event challenges
                                            and submit your work to unlock submission bonuses.
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Win Deckathons:</strong> Compete in pitch competitions
                                            and win first, second, or third place for massive XP boosts.
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Unlock Badges:</strong> Complete specific achievements
                                            to earn badges, some of which grant bonus XP.
                                        </li>
                                        <li>
                                            <strong className="text-foreground">Climb the Leaderboard:</strong> Consistent participation
                                            and high performance will keep you rising through the ranks.
                                        </li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border-b border-border">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    What is a Deckathon?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        A <strong className="text-primary">Deckathon</strong> is a pitch competition
                                        where participants present their ideas, projects, or startups in front of a panel of judges.
                                    </p>
                                    <p className="mb-3">
                                        Think of it as a mashup of &quot;deck&quot; (pitch deck) and &quot;marathon&quot;—a fast-paced event
                                        where you refine your storytelling, business acumen, and presentation skills under pressure.
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-foreground">Key Details:</strong>
                                    </p>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li>Each participant gets 3-5 minutes to pitch</li>
                                        <li>Judges evaluate based on clarity, impact, feasibility, and innovation</li>
                                        <li>Winners are announced at the end of the event</li>
                                        <li>Top performers earn significant XP bonuses and recognition</li>
                                    </ul>
                                    <p className="mt-3">
                                        Whether you&apos;re pitching a tech startup, a social impact project, or a creative idea,
                                        Deckathons are your chance to shine.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border-b border-border">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    Can I join if I am not from AERS?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        <strong className="text-primary">Absolutely, yes!</strong>
                                        BAUYES embraces <strong className="text-foreground">radical collaboration</strong>.
                                    </p>
                                    <p className="mb-3">
                                        While BAUYES originates from the Agriculture and Environmental Sciences (AERS) department
                                        at BAU, we welcome students from <strong className="text-foreground">all departments, universities,
                                            and backgrounds</strong>.
                                    </p>
                                    <p className="mb-3">
                                        Our mission is to build a thriving ecosystem of entrepreneurs, innovators, and changemakers
                                        who are passionate about solving real-world problems—whether in agriculture, technology,
                                        social impact, or beyond.
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-foreground">What we care about:</strong>
                                    </p>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li>Your willingness to learn and collaborate</li>
                                        <li>Your drive to create meaningful impact</li>
                                        <li>Your respect for the community guidelines</li>
                                    </ul>
                                    <p className="mt-3">
                                        So whether you&apos;re studying computer science, business, design, or any other field—
                                        you&apos;re welcome here. Let&apos;s build something great together.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border-b border-border">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    What are badges and how do I unlock them?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        Badges are special achievements that recognize your contributions and milestones
                                        within the BAUYES ecosystem. Each badge has unique unlock criteria.
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-foreground">Examples include:</strong>
                                    </p>
                                    <ul className="space-y-2 list-disc list-inside">
                                        <li><strong className="text-primary">First Steps:</strong> Register for your first event</li>
                                        <li><strong className="text-primary">Rookie:</strong> Earn 100 XP</li>
                                        <li><strong className="text-primary">Pioneer:</strong> Earn 500 XP</li>
                                        <li><strong className="text-primary">Event Regular:</strong> Attend 5 events</li>
                                        <li><strong className="text-primary">Deckathon Winner:</strong> Win a pitch competition</li>
                                    </ul>
                                    <p className="mt-3">
                                        Badges are displayed on your profile and contribute to your overall rank and reputation.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="border-b border-border">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    How does the leaderboard work?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        The leaderboard ranks all participants based on their total XP earned.
                                        The more you participate, the higher you climb.
                                    </p>
                                    <p className="mb-3">
                                        Rankings are updated in real-time and displayed on the dashboard.
                                        Top performers are celebrated and may receive special recognition or opportunities.
                                    </p>
                                    <p className="mt-3">
                                        <strong className="text-foreground">Remember:</strong> The leaderboard is about healthy competition
                                        and community recognition, not cutthroat rivalry. Play fair, support your peers, and level up together.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="border-0">
                                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                    Who can I contact for support?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pt-4">
                                    <p className="mb-3">
                                        If you have questions, technical issues, or feedback, reach out to us at{" "}
                                        <a href="mailto:yesofbau@gmail.com" className="text-primary hover:underline font-medium">
                                            yesofbau@gmail.com
                                        </a>.
                                    </p>
                                    <p className="mb-3">
                                        You can also visit our <a href="/contact" className="text-primary hover:underline">Contact Page</a> to
                                        send us a message directly through the platform.
                                    </p>
                                    <p>
                                        We aim to respond to all inquiries within 48 hours.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </main>
        </div>
    );
}
