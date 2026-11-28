import { Link } from 'react-router-dom'
import { ArrowLeft} from 'lucide-react'
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
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left" className="w-full">
            <h1 className="text-[#f5f5f5] font-bebas text-left mb-2 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              About Me
            </h1>
            <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
              A quick look at who I am, what I do, and the background behind the work.
            </p>
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />
          </AutoReveal>

          <AutoReveal className=" w-full">
            <div className="flex flex-col md:flex-row items-start md:items-stretch gap-6">
              <img
                src={profileImg}
                alt="Shann Agang"
                className="order-1 md:order-2 self-start md:self-stretch w-48 h-56 md:w-64 md:h-auto object-cover rounded-md border border-[#ffffff4d] flex-shrink-0"
              />
              <div className="order-2 md:order-1 flex-1">
                <h1 className="text-[#f3f3f3] text-lg md:text-xl font-light mb-3">Hey, Shann here! A little more about me.</h1>
                <p className="text-[#d0d0d0] text-sm md:text-base mb-3">
                  I grew up in Cebu City and have always been curious about how things work, whether it was exploring design, experimenting with technology, or watching how people interact with the world around them. That curiosity grew into a passion for creating experiences that feel both functional and meaningful.
                </p>
                <p className="text-[#d0d0d0] text-sm md:text-base mb-3">
                  I&rsquo;m a Computer Engineering student focused on full-stack web development, with a soft spot for the front-end. I enjoy crafting digital solutions through coding and design, and I believe technology should not only work well but also feel natural, intuitive, and enjoyable to use.
                </p>
                <p className="text-[#d0d0d0] text-sm md:text-base mb-3">
                  My goal is to keep growing by learning advanced frameworks, improving problem-solving, and practicing through real projects. I want to build user-friendly, interactive websites that prioritize accessibility, performance, and aesthetics, and I&rsquo;m committed to lifelong learning and refining my craft through feedback and iteration.
                </p>
                <p className="text-[#d0d0d0] text-sm md:text-base">
                  Beyond the technical side, I value connection and storytelling. Every project is a chance to share ideas and make a difference, no matter how small, so I enjoy collaborating, exchanging perspectives, and balancing creativity with clarity.
                </p>
              </div>

            </div>
          </AutoReveal>

          <AutoReveal className="w-full mt-6 pt-20">
            <div>
              <h1 className="text-[#f3f3f3] text-lg md:text-xl font-light mb-2">Tech Stack</h1>
              <p className="text-gray-400 text-sm md:text-base mb-4">The tools, frameworks, and platforms I use across front-end, back-end, infrastructure, and AI.</p>
              <hr className="border-t border-[#ffffff38] w-full mb-6" />
              <div className="flex flex-col gap-14">
                {[
                  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'] },
                  { title: 'Backend', items: ['Node.js', 'Express', 'Python', 'Java', 'C++', 'Swing', 'Maven'] },
                  { title: 'Database', items: ['SQL', 'SQLite', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'] },
                  { title: 'DevOps & Cloud', items: ['Docker', 'Vercel', 'Cloudflare', 'GitHub Actions'] },
                  { title: 'AI & Machine Learning', items: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn'] },
                  { title: 'Security & Identity', items: ['OAuth', 'JWT', 'bcrypt', 'Role-based Access'] },
                  { title: 'CMS, No-Code & More', items: ['WordPress', 'Webflow', 'Canva', 'Notion', 'Adobe Illustrator', 'Adobe Photoshop', 'MS Office', 'Excalidraw', 'Wix'] },
                  { title: 'Developer Tools', items: ['Git', 'GitHub', 'Visual Studio Code', 'Postman', 'Figma'] },
                ].map((cat) => (
                  <div key={cat.title}>
                    <h2 className="text-[#f3f3f3] text-sm font-light mb-2">{cat.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((it) => (
                        <span
                          key={it}
                          className="px-2 py-1 text-xs text-gray-400 transition-colors duration-200 hover:text-white"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default About