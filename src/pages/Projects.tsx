import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Background from '@/Background'
import AutoReveal from '@/components/AutoReveal'
import ProjectSection from '@/ProjectSection'

const Projects = () => {
  return (
    <div className="min-h-screen w-full">
      <Background />
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#Project"
              className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left">
            <h1 className="text-[#f5f5f5] font-bebas text-center mb-8 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Projects
            </h1>
          </AutoReveal>

          <AutoReveal className="w-full">
            <ProjectSection />
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Projects