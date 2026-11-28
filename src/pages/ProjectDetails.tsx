import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import { scrollPageBy } from '@/lib/smooth-scroll'
import veynsOverview from '@/assets/VeynsOverview.webp'
import veynsMyRole from '@/assets/VeynsMyRole.webp'
import veynsFeatures from '@/assets/VeynsFeatures.webp'
import veynsWorkflow from '@/assets/VeynsWorkflow.webp'
import veynsUnderTheHood from '@/assets/VeynsUnderTheHood.webp'
import pawOverview from '@/assets/PawTrackOverview.webp'
import pawMyRole from '@/assets/PawTrackMyRole.webp'
import pawFeatures from '@/assets/PawTrackFeatures.webp'
import pawAnalytics from '@/assets/PawTrackAnalytics.webp'
import pawWorkFlow from '@/assets/PawTrackWorkFlow.webp'
import pawWaitlist from '@/assets/PawTrackWaitlist.webp'
import pawData from '@/assets/PawTrackData.webp'
import pawUnderTheHood from '@/assets/PawTrackUnderTheHood.webp'

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
        text: 'A kiosk management system built for retail environments, handling product catalog management, transactions, and reporting with a clean, responsive interface. It brings the entire ordering flow into one place so staff spend less time switching between tools and more time serving customers.',
        image: veynsOverview,
      },
      {
        title: 'My Role',
        text: 'I focused on Quality Assurance and testing — planning test cases, running regression checks, and verifying the ordering flow from menu browsing through checkout. I logged and tracked defects, validated fixes, and made sure each release was stable before it reached real customers.',
        image: veynsMyRole,
      },
      {
        title: 'Features',
        text: 'Real-time product browsing, fast checkout, and clear reporting help staff and customers move through orders smoothly. The catalog stays in sync across the floor, payments are confirmed instantly, and every sale is logged for accurate end-of-day reporting without manual reconciliation.',
        image: veynsFeatures,
      },
      {
        title: 'Workflow',
        text: 'The flow is simple: a customer browses the live menu, places an order, and the kitchen receives it instantly with status updates synced across the counter and the customer’s screen. Staff manage the catalog and track each order from preparation to handoff, all without switching between separate tools.',
        image: veynsWorkflow,
      },
      {
        title: 'Tech Stack',
        text: 'Built with React and TypeScript on top of Tailwind CSS for a consistent, responsive layout, with Supabase handling data and Vercel serving the production build. Brevo powers transactional email so customers receive order updates right in their inbox.',
        image: veynsUnderTheHood,
      },
    ],
  },
  pawtrack: {
    title: 'PawTrack',
    stack: 'Java · Swing · SQLite · Maven',
    chapters: [
      {
        title: 'Overview',
        text: 'A pet shelter and adoption tracker that helps shelters manage animals, process adoptions, and run a first-in-line waitlist with timed reservations. It was designed to replace scattered spreadsheets and paper logs with one reliable desktop tool that staff can trust day to day.',
        image: pawOverview,
      },
      {
        title: 'My Role',
        text: 'I owned the front-end experience — shaping the GUI design, wiring up the dashboard navigation, building the analytics interface, and crafting the import UI. My focus was turning complex shelter data into clean, intuitive screens that staff could pick up with minimal training. I also had a hand in the MainFrame, login and security, GUI development, and analytics, helping lay the groundwork the rest of the app was built on.',
        image: pawMyRole,
      },
      {
        title: 'Features',
        text: 'Staff and adopter roles, animal management, a FIFO waitlist with 72-hour reservations, and CSV import/export. Each role sees only the controls it needs, so volunteers can log in without risking sensitive shelter data or the integrity of the queue.',
        image: pawFeatures,
      },
      {
        title: 'Shelter Analytics',
        text: 'Shelter analytics highlight top breeds and average stay length to help shelters make informed decisions. By turning everyday records into clear charts, the dashboard shows which animals wait longest and where capacity is being strained.',
        image: pawAnalytics,
      },
      {
        title: 'Adoption Workflow',
        text: 'Adopters browse available animals, filter by species and age, and submit applications that staff review and approve in a single guided flow. Status updates keep applicants informed at every step, reducing no-shows and repeated phone calls to the front desk.',
        image: pawWorkFlow,
      },
      {
        title: 'Waitlist & Reservations',
        text: 'A first-in-line waitlist holds a match for 72 hours, automatically expiring stale reservations so the next adopter in line is notified in time. The timer keeps the process fair and prevents animals from being quietly held indefinitely by a single household.',
        image: pawWaitlist,
      },
      {
        title: 'Data & Reporting',
        text: 'CSV import and export let shelters migrate records and share reports, while built-in metrics surface occupancy, adoption rate, and average length of stay. Because everything lives in a local SQLite file, backups are simple and the data stays fully under the shelter’s control.',
        image: pawData,
      },
      {
        title: 'Under the Hood',
        text: 'Built with Java and Swing on top of an SQLite database and managed with Maven, keeping the desktop app lightweight, portable, and easy to run locally. The single-file database means a new machine can be up and running in minutes without any server setup.',
        image: pawUnderTheHood,
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
    const content = el.firstElementChild as HTMLElement | null

    const update = () => {
      const idx = Math.round(el.scrollTop / (el.clientHeight || 1))
      setActive(Math.max(0, Math.min(project.chapters.length - 1, idx)))
    }
    el.addEventListener('scroll', update, { passive: true })

    // Desktop: smooth Lenis on the container; at the edges forward the wheel
    // to the page so the site keeps scrolling while hovering the container.
    let lenis: Lenis | null = null
    const onWheelCapture = (e: WheelEvent) => {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        scrollPageBy(e.deltaY)
      }
    }
    if (content && window.matchMedia('(pointer: fine)').matches) {
      el.addEventListener('wheel', onWheelCapture, { capture: true, passive: false })
      lenis = new Lenis({
        wrapper: el,
        content,
        autoRaf: true,
        lerp: 0.4,
        smoothWheel: true,
        overscroll: true,
      })
      lenis.on('scroll', update)
    }

    return () => {
      el.removeEventListener('scroll', update)
      el.removeEventListener('wheel', onWheelCapture, { capture: true } as any)
      lenis?.destroy()
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
                    className="project-scroll h-full overflow-y-auto overscroll-auto md:overscroll-contain"
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
                            <AutoReveal direction="left">
                              <h2
                                className={`text-sm font-light mb-4 transition-colors duration-300 ${
                                  active === i ? 'text-[#f3f3f3]' : 'text-gray-600'
                                }`}
                              >
                                {c.title}
                              </h2>
                            </AutoReveal>
                            <AutoReveal direction="left">
                              <p
                                className={`text-sm md:text-base leading-[1.5] transition-colors duration-300 ${
                                  active === i ? 'text-[#d0d0d0]' : 'text-gray-600'
                                }`}
                              >
                                {c.text}
                              </p>
                            </AutoReveal>
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