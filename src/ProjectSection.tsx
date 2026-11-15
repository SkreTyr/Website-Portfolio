import ThreeDCarousel from "@/components/lightswind/3d-carousel";
import veynsImage from "./assets/VeynsWebsite.webp";
import ergonomicsImage from "./assets/SmartErgonomics.webp";
import automotiveImage from "./assets/AutomotiveComfort.webp";


export default function ProjectSection() {
  return <div className=''><ThreeDCarousel items={[  {
      id: 1,
      title: "Project One",
      brand: "Temporary",
      description: "A temporary placeholder card used for testing the project section performance.",
      tags: ["Test", "Placeholder"],
      imageUrl: veynsImage,
      link: "#",
    },
    {
      id: 2,
      title: "Smart Ergonomics",
      brand: "Herman Miller",
      description: "Pressure-sensitive fabrics in office chairs that analyze posture and suggest adjustments for optimal health.",
      tags: ["Office", "Health", "Furniture"],
      imageUrl: ergonomicsImage,
      link: "#",
    },
    {
      id: 3,
      title: "Automotive Comfort",
      brand: "Tesla",
      description: "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
      tags: ["Auto", "Safety", "Smart"],
      imageUrl: automotiveImage,
      link: "#",
    },]} isMobileSwipe /></div>
}