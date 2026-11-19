import { Link } from 'react-router-dom'
import { ArrowLeft, UserRoundPen, CornerDownRight, MapPin, MailDot, GraduationCap } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import profileImg from '@/assets/Profile3.webp'

const About = () => {
  return (
    <div className="min-h-screen w-full">
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#About"
              className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left">
            <h1 className="text-[#f5f5f5] font-bebas text-center mb-8 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              About Me
            </h1>
          </AutoReveal>

          <AutoReveal className="w-full">
            <div className="border border-[#ffffff4d] bg-[#151515] p-4 rounded-md">
              <div className="flex items-center gap-5 font-mono">
                <UserRoundPen color="#ffffff" />
                <h2 className="text-[#f5f5f5]">A bit of introduction</h2>
              </div>
              <hr className="border-t border-[#ffffff38] w-full mt-2 mb-4" />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-5 font-mono">
                  <CornerDownRight color="grey" />
                  <h3 className="text-[#f3f3f3]">Shann Michael D. Agang</h3>
                </div>
                <div className="flex items-center gap-5 font-mono">
                  <MapPin color="grey" />
                  <h3 className="text-[#f3f3f3]">Luz, Cebu City, Philippines</h3>
                </div>
                <div className="flex items-center gap-5 font-mono">
                  <MailDot color="grey" />
                  <h3 className="text-[#f3f3f3]">Shannmichaelagang@gmail.com</h3>
                </div>
                <div className="flex items-center gap-5 font-mono">
                  <GraduationCap color="grey" />
                  <h3 className="text-[#f3f3f3]">Computer Engineering</h3>
                </div>
              </div>

              <hr className="border-t border-[#ffffff38] w-full mt-6 mb-4" />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-40 h-40 shrink-0 rounded-md overflow-hidden border border-[#ffffff4d]">
                  <img src={profileImg} alt="Profile Picture" className="w-full h-full object-cover" />
                </div>
                <p className="text-[#d0d0d0] font-mono text-base">
                  I am a Computer Engineering student at the University of Cebu specializing in software
                  design, local databases, and network infrastructure. I focus on building clean, reliable
                  systems using a first-principles approach.
                </p>
              </div>
            </div>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default About