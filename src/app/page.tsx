export const dynamic = "force-dynamic";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StorySection from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <StorySection />
    </main>
  );
}
