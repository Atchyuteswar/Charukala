import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StorySection from "@/components/home/StorySection";
import Testimonials from "@/components/home/Testimonials";
import FashionGallery from "@/components/home/FashionGallery";
import PersonalizedSection from "@/components/home/PersonalizedSection";
import AILookbook from "@/components/home/AILookbook";

export default function HomePage() {

  return (

    <main>

      <Hero />

      <PersonalizedSection />

      <AILookbook />

      <Categories />

      <FeaturedProducts />

      <StorySection />

      <FashionGallery />

      <Testimonials />

    </main>

  );

}