import HeroSanctuary from "@/components/sections/HeroSanctuary";
import WorkIndex from "@/components/sections/WorkIndex";
import PhilosophyStrip from "@/components/sections/PhilosophyStrip";
import Colophon from "@/components/sections/Colophon";
import StickyNav from "@/components/StickyNav";

export default function Home() {
  return (
    <main>
      <StickyNav />
      <HeroSanctuary />
      <WorkIndex />
      <PhilosophyStrip />
      <Colophon />
    </main>
  );
}

