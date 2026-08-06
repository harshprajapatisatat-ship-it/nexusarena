import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedCarousel from "@/components/sections/FeaturedCarousel";
import LiveStats from "@/components/sections/LiveStats";
import UpcomingTournaments from "@/components/sections/UpcomingTournaments";
import TrendingGames from "@/components/sections/TrendingGames";
import LatestNews from "@/components/sections/LatestNews";
import LeaderboardPreview from "@/components/sections/LeaderboardPreview";
import Categories from "@/components/sections/Categories";
import CommunityHighlights from "@/components/sections/CommunityHighlights";
import Sponsors from "@/components/sections/Sponsors";
import Newsletter from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "Nexus Arena — Next-Generation Competitive Gaming Platform",
  description:
    "1,200+ titles, million-dollar tournaments, live leaderboards, and 1.2M players. Nexus Arena is where competitive gaming happens.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <LiveStats />
      <UpcomingTournaments />
      <TrendingGames />
      <LatestNews />
      <LeaderboardPreview />
      <Categories />
      <CommunityHighlights />
      <Sponsors />
      <Newsletter />
    </>
  );
}
