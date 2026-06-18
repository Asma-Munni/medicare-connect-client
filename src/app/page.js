import Image from "next/image";
import HeroBanner from "@/components/HeroBanner";
import MedicalSpecializations from "@/components/MedicalSpecializations";
import WhyChoose from "@/components/WhyChoose";


export default function Home() {
  return (
   <div>
        <HeroBanner></HeroBanner>
        <MedicalSpecializations></MedicalSpecializations>
        <WhyChoose></WhyChoose>
        </div> 
  );
}
