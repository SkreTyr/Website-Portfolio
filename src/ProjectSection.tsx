import ThreeDCarousel from "@/components/lightswind/3d-carousel";
import veynsImage from "./assets/VeynsWebsite.webp";
import automotiveImage from "./assets/AutomotiveComfort.webp";
import pawTrackImage from "./assets/PawTrack-Preview.webp";


export default function ProjectSection() {
  return <div className=''><ThreeDCarousel items={[  {
      id: 1,
      title: "VEYNS",
      brand: "By Geoff Perez",
      description: "A dedicated online ordering system connecting local kitchens directly to customers for fast delivery, real-time tracking, and commission-free ordering.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      imageUrl: veynsImage,
      link: "https://veyns-ubec.vercel.app/",
      to: "/projects/veyns",
    },
    {
      id: 2,
      title: "PawTrack",
      brand: "Capstone Project",
      description: "A pet shelter and adoption tracker that helps shelters manage animals, process adoptions, and run a first-in-line waitlist with timed reservations, plus CSV import/export and shelter analytics like top breeds and average stay.",
      tags: ["Java", "Swing", "SQLite", "Maven"],
      imageUrl: pawTrackImage,
      link: "#",
      to: "/projects/pawtrack",
    },
    {
      id: 3,
      title: "Automotive Comfort",
      brand: "Tesla",
      description: "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
      tags: ["Auto", "Safety", "Smart"],
      imageUrl: automotiveImage,
      link: "#",
      disabled: true,
    },]} isMobileSwipe /></div>
}