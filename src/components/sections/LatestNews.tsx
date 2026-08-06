import { NEWS } from "@/lib/data";
import NewsCard from "@/components/ui/NewsCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { NeonLink } from "@/components/ui/NeonButton";
import VideoPreview from "@/components/ui/VideoPreview";

export default function LatestNews() {
  const [lead, ...rest] = NEWS.slice(0, 5);

  return (
    <section
      aria-labelledby="news-heading"
      className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeading
        eyebrow="Newsroom"
        title={
          <span id="news-heading">
            Latest <span className="text-gradient">News</span> & Updates
          </span>
        }
        subtitle="Patch notes, esports coverage, and dev blogs straight from the studios."
        action={
          <NeonLink href="/news" variant="secondary" size="sm">
            All stories
          </NeonLink>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-1 lg:row-span-2">
          <NewsCard item={lead} featured />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {rest.map((item, i) => (
            <Reveal key={item.id} delay={0.08 * (i + 1)} className="h-full">
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Video preview strip */}
      <Reveal delay={0.1} className="mt-5">
        <VideoPreview />
      </Reveal>
    </section>
  );
}
