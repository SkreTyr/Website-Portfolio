import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Background from '@/Background'
import AutoReveal from '@/components/AutoReveal'

const projects: Record<string, { title: string; description: string; stack: string; liveUrl?: string }> = {
  veyns: {
    title: 'Veyns',
    description:
      'A kiosk management system built for retail environments. It handles product catalog management, transactions, and reporting with a clean, responsive interface.',
    stack: 'React · TypeScript · Tailwind CSS',
    liveUrl: 'https://veyns-ubec.vercel.app/',
  },
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? projects[id] : undefined

  return (
    <div className="min-h-screen w-full">
      <Background />
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center sm:w-full lg:w-3/4 xl:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#Project"
              className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          {project ? (
            <AutoReveal className="w-full">
              <h1 className="text-[#f5f5f5] font-bebas text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl text-center mb-6">
                {project.title}
              </h1>
              <div className="border border-[#ffffff4d] bg-[#151515] p-4 rounded-md">
                <p className="text-[#d0d0d0] font-mono text-sm md:text-base">{project.description}</p>
                <hr className="border-t border-[#ffffff38] w-full mt-4 mb-4" />
                <p className="text-[#d0d0d0] font-mono text-sm">{project.stack}</p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-mono text-sm relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Visit Live Site
                  </a>
                )}
              </div>
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