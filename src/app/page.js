import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import WhyChoose from "@/components/WhyChoose";
import HomeTestimonials from "@/components/HomeTestimonials";


export default function Home() {
  return (
   <div>
        <HeroBanner></HeroBanner>
        <HomeTestimonials />
        <MedicalSpecializations></MedicalSpecializations>
        <WhyChoose></WhyChoose>
        </div> 
  );
}
