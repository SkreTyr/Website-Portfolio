import ThreeDCarousel from "@/components/lightswind/3d-carousel";
import veynsImage from "./assets/VeynsWebsite.webp";


export default function ProjectSection() {
  return <div className=''><ThreeDCarousel items={[  {
      id: 1,
      title: "VEYNS",
      brand: "Food | Health | Direct Dispatch",
      description: "A dedicated online ordering system connecting local kitchens directly to customers for fast delivery, real-time tracking, and commission-free ordering.",
      tags: ["Quality Assurance", "Front-End"],
      imageUrl: veynsImage,
      link: "https://veyns-ubec.vercel.app/",
      to: "/projects/veyns",
    },
    {
      id: 2,
      title: "Smart Ergonomics",
      brand: "Herman Miller",
      description: "Pressure-sensitive fabrics in office chairs that analyze posture and suggest adjustments for optimal health.",
      tags: ["Office", "Health", "Furniture"],
      imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2938&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 3,
      title: "Automotive Comfort",
      brand: "Tesla",
      description: "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
      tags: ["Auto", "Safety", "Smart"],
      imageUrl: "https://images.unsplash.com/photo-1561580125-028ce3bfcb25?q=80&w=2940&auto=format&fit=crop",
      link: "#",
    },]} isMobileSwipe /></div>
}