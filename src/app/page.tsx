import HeroSanctuary from "@/components/sections/HeroSanctuary";
import IntroStatement from "@/components/sections/IntroStatement";
import WorkIndex from "@/components/sections/WorkIndex";
import PhilosophyStrip from "@/components/sections/PhilosophyStrip";
import Colophon from "@/components/sections/Colophon";
import StickyNav from "@/components/StickyNav";

export default function Home() {
  return (
    <main>
      <StickyNav />
      <HeroSanctuary />
      <IntroStatement />
      <WorkIndex />
      <PhilosophyStrip />
      <Colophon />
    </main>
  );
}

