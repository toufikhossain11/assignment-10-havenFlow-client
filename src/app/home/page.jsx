import HeroBanner from "@/components/home/Banner";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Locations from "@/components/home/Locations";
import Review from "@/components/home/Review";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getProperties } from "@/lib/homeData/data";

async function FeaturedPropertiesWrapper() {
  const properties = await getProperties();

  return <FeaturedProperties properties={properties} />;
}

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <FeaturedPropertiesWrapper/>
      <WhyChooseUs/>
      <Review/>
      <Locations/>
    </div>
  );
}
