import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import veynsImage from '@/assets/VeynsWebsite.webp'
import pawTrackImage from '@/assets/PawTrack-Preview.webp'
import automotiveImage from '@/assets/AutomotiveComfort.webp'

type Project = {
  id: string
  title: string
  brand: string
  description: string
  tags: string[]
  image: string
  to?: string
  disabled?: boolean
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 'pawtrack',
    title: 'PawTrack',
    brand: 'Capstone Project',
    description:
      'A pet shelter and adoption tracker that helps shelters manage animals, process adoptions, and run a first-in-line waitlist with timed reservations, plus CSV import/export and shelter analytics.',
    tags: ['Java', 'Swing', 'SQLite', 'Maven'],
    image: pawTrackImage,
    to: '/projects/pawtrack',
    featured: true,
  },
  {
    id: 'veyns',
    title: 'VEYNS',
    brand: "Friend's Business",
    description:
      'A dedicated online ordering system connecting local kitchens directly to customers for fast delivery, real-time tracking, and commission-free ordering.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: veynsImage,
    to: '/projects/veyns',
  },
  {
    id: 'automotive',
    title: 'Automotive Comfort',
    brand: 'Tesla',
    description:
      'Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.',
    tags: ['Auto', 'Safety', 'Smart'],
    image: automotiveImage,
    disabled: true,
  },
]

const Projects = () => {
  return (
    <div className="min-h-screen w-full">
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#Project"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left" className="w-full">
            <h1 className="text-[#f5f5f5] font-bebas text-left mb-2 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Projects
            </h1>
            <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
              A selection of projects I&rsquo;ve designed and built — from web apps to network and software work.
            </p>
            <hr className="border-t border-[#ffffff38] w-full mb-8" />
          </AutoReveal>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-5">
            {projects.map((p, i) => {
              const className = `group relative overflow-hidden rounded-md border border-[#ffffff4d] bg-[#151515] text-left transition-transform duration-300 hover:-translate-y-1 ${
                p.featured ? 'md:col-span-2 md:row-span-2 min-h-[380px]' : 'min-h-[200px]'
              }`

              const inner = (
                <>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="keep-color absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
                  <span className="absolute top-3 right-4 font-bebas text-5xl md:text-6xl text-white/10 group-hover:text-white/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="keep-color absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 mb-1">{p.brand}</p>
                    <h2
                      className={`font-bebas text-white leading-none ${
                        p.featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
                      }`}
                    >
                      {p.title}
                    </h2>
                    <p className={`text-gray-400 text-xs md:text-sm mt-2 max-w-md ${p.featured ? 'line-clamp-2' : 'line-clamp-1'}`}>{p.description}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide text-gray-300 border border-[#ffffff33] bg-black/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.disabled ? (
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-gray-500">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-white">
                        Learn More
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
                      </span>
                    )}
                  </div>
                </>
              )

              return p.disabled ? (
                <div key={p.id} className={className}>
                  {inner}
                </div>
              ) : (
                <Link key={p.id} to={p.to || '#'} className={className}>
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects