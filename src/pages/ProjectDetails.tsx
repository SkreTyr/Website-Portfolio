import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import veynsImage from '@/assets/VeynsWebsite.webp'
import pawTrackImage from '@/assets/PawTrack-Preview.webp'

interface Chapter {
  title: string
  text: string
  image: string
}

const projects: Record<
  string,
  { title: string; stack: string; liveUrl?: string; chapters: Chapter[] }
> = {
  veyns: {
    title: 'Veyns',
    stack: 'React · TypeScript · Tailwind CSS · Supabase',
    liveUrl: 'https://veyns-ubec.vercel.app/',
    chapters: [
      {
        title: 'Overview',
        text: 'A kiosk management system built for retail environments, handling product catalog management, transactions, and reporting with a clean, responsive interface.',
        image: veynsImage,
      },
      {
        title: 'Features',
        text: 'Real-time product browsing, fast checkout, and clear reporting help staff and customers move through orders smoothly.',
        image: veynsImage,
      },
      {
        title: 'Result',
        text: 'A responsive, commission-free ordering experience that connects local kitchens directly to their customers.',
        image: veynsImage,
      },
    ],
  },
  pawtrack: {
    title: 'PawTrack',
    stack: 'Java · Swing · SQLite · Maven',
    chapters: [
      {
        title: 'Overview',
        text: 'A pet shelter and adoption tracker that helps shelters manage animals, process adoptions, and run a first-in-line waitlist with timed reservations.',
        image: pawTrackImage,
      },
      {
        title: 'Features',
        text: 'Staff and adopter roles, animal management, a FIFO waitlist with 72-hour reservations, and CSV import/export.',
        image: pawTrackImage,
      },
      {
        title: 'Shelter Analytics',
        text: 'Shelter analytics highlight top breeds and average stay length to help shelters make informed decisions.',
        image: pawTrackImage,
      },
    ],
  },
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? projects[id] : undefined
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActive(0)
    if (containerRef.current) containerRef.current.scrollTop = 0
  }, [id])

  useEffect(() => {
    const el = containerRef.current
    if (!el || !project) return

    const update = () => {
      const idx = Math.round(el.scrollTop / (el.clientHeight || 1))
      setActive(Math.max(0, Math.min(project.chapters.length - 1, idx)))
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      el.scrollTop += e.deltaY
      update()
    }
    el.addEventListener('scroll', update, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('scroll', update)
      el.removeEventListener('wheel', onWheel)
    }
  }, [project])

  return (
    <div className="min-h-screen w-full">
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center sm:w-full lg:w-3/4 xl:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#Project"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          {project ? (
            <AutoReveal className="w-full">
              <h1 className="text-[#f5f5f5] font-bebas text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl text-center mb-10">
                {project.title}
              </h1>

              <div className="w-full max-w-6xl mx-auto">
                <div className="relative border border-[#ffffff4d] bg-[#151515] rounded-md h-[600px] overflow-hidden">
                  <div
                    ref={containerRef}
                    className="project-scroll h-full overflow-y-auto overscroll-contain"
                  >
                    <div className="grid md:grid-cols-2 gap-8 p-6 items-start">
                      <div className="flex flex-col">
                        {project.chapters.map((c, i) => (
                          <div
                            key={i}
                            className="min-h-[600px] flex flex-col justify-center"
                          >
                            <img
                              src={c.image}
                              alt={c.title}
                              className="md:hidden w-full h-48 object-cover rounded-md border border-[#ffffff4d] mb-4"
                            />
                            <h2
                              className={`font-mono font-bold text-2xl mb-4 transition-colors duration-300 ${
                                active === i ? 'text-[#f3f3f3]' : 'text-gray-600'
                              }`}
                            >
                              {c.title}
                            </h2>
                            <p
                              className={`text-sm md:text-base leading-[1.5] transition-colors duration-300 ${
                                active === i ? 'text-[#d0d0d0]' : 'text-gray-600'
                              }`}
                            >
                              {c.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="hidden md:block" />
                    </div>
                  </div>

                  <div className="pointer-events-none hidden md:block absolute right-6 top-1/2 -translate-y-1/2 h-80 w-[calc(50%-3rem)] max-w-sm rounded-md overflow-hidden border border-[#ffffff4d] bg-[#101010]">
                    {project.chapters.map((c, i) => (
                      <img
                        key={i}
                        src={c.image}
                        alt={c.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          active === i ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {project.liveUrl && (
                <div className="mt-8 text-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-400 hover:text-blue-300 text-sm relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-blue-300 after:transition-[width] after:duration-300 hover:after:w-full"
                  >
                    Visit Live Site
                  </a>
                </div>
              )}
            </AutoReveal>
          ) : (
            <AutoReveal>
              <h1 className="text-[#f5f5f5] font-bebas text-4xl md:text-5xl text-center">
                Project not found
              </h1>
            </AutoReveal>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProjectDetails