import { Link } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, ArrowUpRight } from 'lucide-react'
import Background from '@/Background'
import AutoReveal from '@/components/AutoReveal'
import { GlowingCards, GlowingCard } from '@/components/lightswind/glowing-cards'
import ciscoLogo from '@/assets/CiscoLogo.png'
import ibmLogo from '@/assets/IBMLOGO.png'
import codedexLogo from '@/assets/CodedexLogo.png'

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
]

const Certifications = () => {
  return (
    <div className="min-h-screen w-full">
      <Background />
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-4/5">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#Certifications"
              className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left">
            <h1 className="text-[#f5f5f5] font-bebas text-center mb-8 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Certifications
            </h1>
          </AutoReveal>

          <GlowingCards>
            {certifications.map((cert) => (
              <AutoReveal key={cert.key} className="flex-1 min-w-[13rem] w-2/3">
                <GlowingCard
                  glowColor={cert.glowColor}
                  className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full"
                >
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="flex space-x-2 items-center">
                      <BadgeCheck className="w-6 h-5 text-blue-500 font-mono" />
                      <h1 className="font-mono text-lg">{cert.issuer}</h1>
                    </div>
                    <div className="w-20 lg:w-24 h-14 ml-auto border border-[#ffffff4d] p-1 rounded-md overflow-hidden">
                      <img src={cert.image} alt="Logo" className="w-full h-full object-cover scale-110" />
                    </div>
                    <div className="col-span-2 font-mono text-lg text-[#d0d0d0]">{cert.title}</div>
                  </div>

                  <hr className="border-t border-[#ffffff38] w-full mt-2" />

                  <div className="flex justify-center mt-3 group">
                    <a
                      href={cert.credentialUrl}
                      className="text-gray-300 hover:text-blue-600 relative inline-block text-sm after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-all after:duration-300 hover:after:w-full font-mono"
                    >
                      View Credential
                    </a>
                    <ArrowUpRight className="text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500" />
                  </div>

                  <p className="text-center font-mono text-xs text-gray-500 mt-2">{cert.date}</p>
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