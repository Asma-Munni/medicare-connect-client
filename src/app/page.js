import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import WhyChoose from "@/components/WhyChoose";
import HomeTestimonials from "@/components/HomeTestimonials";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import PlatformStats from "@/components/PlatformStats";


export default function Home() {
  return (
   <div>
        <HeroBanner></HeroBanner>
        <FeaturedDoctors />
        <PlatformStats />
        <HomeTestimonials />
        <MedicalSpecializations></MedicalSpecializations>
        <WhyChoose></WhyChoose>
        </div> 
  );
}
