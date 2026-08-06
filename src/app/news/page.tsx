import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import NewsFeed from "@/components/pages/NewsFeed";
import VideoPreview from "@/components/ui/VideoPreview";
import Reveal from "@/components/ui/Reveal";
import { NEWS } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Updates — Patch Notes, Esports & Dev Blogs",
  description:
    "Patch notes, esports coverage, developer blogs, and community announcements from every studio on the Nexus Arena platform.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Updates | Nexus Arena",
    description: "Patch notes, esports coverage, and dev blogs from every Nexus studio.",
    url: "/news",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Nexus Arena News",
  description: "Patch notes, esports coverage, and developer blogs.",
  blogPost: NEWS.map((n) => ({
    "@type": "BlogPosting",
    headline: n.title,
    description: n.excerpt,
    datePublished: n.date,
    author: { "@type": "Person", name: n.author },
    publisher: { "@type": "Organization", name: "Nexus Arena" },
    articleSection: n.category,
    wordCount: n.readTime * 220,
  })),
};

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Newsroom"
        crumb="News"
        accent="#00e5ff"
        title={
          <>
            Everything that <span className="text-gradient">changed.</span>
          </>
        }
        subtitle="Patch notes, esports coverage, and developer blogs — published the moment they land, not a week later."
      />

      <NewsFeed />

      <section
        aria-labelledby="video-heading"
        className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28"
      >
        <h2 id="video-heading" className="sr-only">
          Latest videos
        </h2>
        <Reveal>
          <VideoPreview />
        </Reveal>
      </section>
    </>
  );
}
