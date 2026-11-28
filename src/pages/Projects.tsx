import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'

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
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Projects