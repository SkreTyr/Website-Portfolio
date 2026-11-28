import { Link } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, ArrowUpRight } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import { GlowingCards, GlowingCard } from '@/components/lightswind/glowing-cards'
import ciscoLogo from '@/assets/CiscoLogo.webp'
import ibmLogo from '@/assets/IBMLOGO.webp'
import codedexLogo from '@/assets/CodedexLogo.webp'

interface Certification {
  key: number
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl?: string
  glowColor: string
}

const certifications: Certification[] = [
  {
    key: 1,
    title: 'Network Support and Security',
    issuer: 'NetAcad (Cisco)',
    date: '2024',
    image: ciscoLogo,
    credentialUrl: '#',
    glowColor: '#60a5fa',
  },
  {
    key: 2,
    title: 'Network Support and Security',
    issuer: 'NetAcad (IBM)',
    date: '2024',
    image: ibmLogo,
    credentialUrl: '#',
    glowColor: '#4ade80',
  },
  {
    key: 3,
    title: 'Network Support and Security',
    issuer: 'Codedex',
    date: '2024',
    image: codedexLogo,
    credentialUrl: '#',
    glowColor: '#facc15',
  },
  {
    key: 4,
    title: 'Network Support and Security',
    issuer: 'Codedex',
    date: '2024',
    image: codedexLogo,
    credentialUrl: '#',
    glowColor: '#facc15',
  },
  {
    key: 5,
    title: 'Network Support and Security',
    issuer: 'Codedex',
    date: '2024',
    image: codedexLogo,
    credentialUrl: '#',
    glowColor: '#facc15',
  },
  {
    key: 6,
    title: 'Network Support and Security',
    issuer: 'Codedex',
    date: '2024',
    image: codedexLogo,
    credentialUrl: '#',
    glowColor: '#facc15',
  },
]

const Certifications = () => {
  return (
    <div className=" min-h-screen w-full">
      <section className=" h-auto w-full flex justify-center pt-32 pb-20">
        <div className=" w-full p-5 flex flex-col items-center justify-center md:w-full lg:w-4/5 xl:w-3/5">
          <AutoReveal direction="left" className=" w-full md:pl-10 lg:pl-0">
            <Link
              to="/#Certifications"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

<AutoReveal direction="left" className="w-full md:pl-10 lg:pl-0">
            <h1 className="text-[#f5f5f5] font-bebas text-left mb-2 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Certifications
            </h1>
            <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
              A collection of professional certifications and credentials earned across networking, security, and software development.
            </p>
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />
          </AutoReveal>

<GlowingCards padding='' gap="1.5rem" className=" md:px-10 lg:px-0">
  {certifications.map((cert) => (
    <AutoReveal key={cert.key} className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
      <GlowingCard
        glowColor={cert.glowColor}
        className="group relative border border-[#ffffff4d] bg-[#151515] p-5 rounded-md w-full"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <BadgeCheck className="w-5 h-5 shrink-0 text-blue-500 drop-shadow-[0_0_6px_#3b82f6]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 truncate">
              {cert.issuer}
            </span>
          </div>
          <div className="w-20 h-16 shrink-0 border border-[#ffffff4d] p-1 rounded-md overflow-hidden bg-black/30">
            <img
              src={cert.image}
              alt="Logo"
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain ${
                cert.issuer.includes('Codedex') || cert.issuer.includes('Cisco') ? 'scale-150' : 'scale-110'
              }`}
            />
          </div>
        </div>

        <h1 className="mt-4 text-xl text-[#f3f3f3] font-normal leading-tight">{cert.title}</h1>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <span className="px-2 py-0.5 rounded border border-[#ffffff33] bg-black/30">{cert.date}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>Authenticated</span>
        </div>

        <div className="flex justify-center mt-3">
          <span className="text-gray-300 group-hover:text-blue-400 flex items-center relative text-sm transition-colors">
            <span className="learn-more-underline relative inline-block after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-white after:transition-[width] after:duration-300 group-hover:after:w-full">
              Learn More
            </span>
            <ArrowUpRight className="text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
          </span>
        </div>

        <a href={cert.credentialUrl || '#'} aria-label="Learn More" className="absolute inset-0 z-10 rounded-md" />
      </GlowingCard>
    </AutoReveal>
  ))}
</GlowingCards>
        </div>
      </section>
    </div>
  )
}

export default Certifications