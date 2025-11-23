import { GridBackground } from "@/components/ui/GridBackground";
import { Hero } from "@/components/home/Hero";
import { CoreValues } from "@/components/home/CoreValues";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <main className="relative z-10">
        <Hero />
        <CoreValues />
      </main>
    </div>
  );
}
