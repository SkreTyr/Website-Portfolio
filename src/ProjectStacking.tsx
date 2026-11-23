import { StackingCards } from "@/components/lightswind/stacking-cards";
import veynsImage from "./assets/VeynsWebsite.webp";
import ergonomicsImage from "./assets/SmartErgonomics.webp";
import automotiveImage from "./assets/AutomotiveComfort.webp";


export default function ProjectStacking() {
  return (
    <div className="w-full">
      <StackingCards
        items={[
          {
            id: 1,
            title: "VEYNS",
            brand: "Food | Health | Direct Dispatch",
            description:
              "A dedicated online ordering system connecting local kitchens directly to customers for fast delivery, real-time tracking, and commission-free ordering.",
            tags: ["Quality Assurance", "Front-End"],
            imageUrl: veynsImage,
            link: "https://veyns-ubec.vercel.app/",
            to: "/projects/veyns",
          },
          {
            id: 2,
            title: "Smart Ergonomics",
            brand: "Herman Miller",
            description:
              "Pressure-sensitive fabrics in office chairs that analyze posture and suggest adjustments for optimal health.",
            tags: ["Office", "Health", "Furniture"],
            imageUrl: ergonomicsImage,
            link: "#",
          },
          {
            id: 3,
            title: "Automotive Comfort",
            brand: "Tesla",
            description:
              "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
            tags: ["Auto", "Safety", "Smart"],
            imageUrl: automotiveImage,
            link: "#",
            disabled: true,
          },
        ]}
      />
    </div>
  );
}