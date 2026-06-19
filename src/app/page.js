import HeroBanner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Locations from "@/components/home/Locations";
import Review from "@/components/home/Review";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <FeaturedProperties/>
      <WhyChooseUs/>
      <Review/>
      <Locations/>
    </div>
  );
}
