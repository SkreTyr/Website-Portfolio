import { useEffect, useState } from 'react'
import Button from './Button'
import { TypingText } from './components/lightswind/typing-text'
import profileImg from './assets/Profile3.jpg'
import { UserRoundPen } from 'lucide-react'
import { CornerDownRight } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { MailDot } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { LogoLoop } from '@/components/LogoLoop';
import { ChevronDown } from 'lucide-react';
import AutoReveal from '@/components/AutoReveal'
import { Scroll } from 'lucide-react';

function App() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY === 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>

      <section className="bg-[#121212] h-screen w-full flex justify-center">
        <div className="pt-20 w-full p-5 flex flex-col items-center justify-center  sm:w-3/4 md:w-3/4 xl:p-20" >
        <AutoReveal >
          <TypingText
            as="h1"
            className="text-[#f5f5f5] font-bebas text-center"
            fontSize="text-5xl sm:text-7xl 2xl:text-8xl"
            fontWeight=""
            color=""
            letterSpacing=""
            align="center"
            duration={2}
          >
            Shann Michael <br />Agang
          </TypingText>
          </AutoReveal>
 <AutoReveal>
          <TypingText
            as="h3"
            className="text-[#f3f3f3] font-mono mt-5 mb-3 xl 2xl:text-1xl"
            fontSize=""
            fontWeight=""
            color=""
            letterSpacing=""
            align="center"
            duration={2}
          >
            Software Engineer
          </TypingText>
</AutoReveal>
 <AutoReveal className="w-full flex justify-center">
          <TypingText
            as="p"
            className="text-[#d0d0d0] font-mono text-center text-lg mt-10 lg:w-2/3 2xl:text-1xl"
            fontSize=""
            fontWeight=""
            color=""
            letterSpacing=""
            align="center"
            duration={4}
          >
As a dedicated computer engineering student, I combine a strong technical foundation with a true passion for full stack development.<br />
I love building responsive web applications, mastering new coding frameworks, and turning creative concepts into vibrant digital reality.
          </TypingText>
          </AutoReveal>

          <Button />

<div className={`transition-opacity duration-300 ease-out ${atTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <h3 className='text-[#d4d4d4] font-mono opacity-4 text-sm'>Scroll Down</h3>
                  <ChevronDown className='text-[#d1d1d1] w-4 h-4 animate-bounce md:mt-2 block mx-auto' />
                </div>
        </div>
      </section>



      <section id='About' className="bg-[#121212] h-auto w-full flex justify-center">
        <div className=" w-full p-5 pt-80 pb-80 flex flex-col items-center justify-center sm:w-full md:overflow-x-hidden md:w-full lg:w-3/4 xl:w-3/4 2xl:w-2/4 lg:overflow-x-hidden h-auto">
<AutoReveal direction="left">
          <h1 className="text-[#f5f5f5] font-bebas text-center mb-5 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
            about me
          </h1>
</AutoReveal>
<AutoReveal className="w-full flex justify-center">
<div className=" h-screen w-full grid grid-cols-1 grid-rows-[repeat(12,auto)] gap-4 md:h-3/4 md:grid-cols-3 md:grid-rows-5">

        <div className="row-span-3 border border-[#ffffff4d] bg-[#171717] p-2 rounded-md">
          <div className="bg-yellow-200 h-full rounded-md overflow-hidden"><img src={profileImg} alt='Profile Picture' className="w-full h-full object-cover" /></div>
        </div>

    <div className="row-span-4 row-start-4 border border-[#ffffff4d] bg-[#171717] p-2 rounded-md  md:col-span-2 md:row-span-3">
<div className=" h-full rounded-md">
<div className="flex items-center gap-5 font-mono">
<UserRoundPen color="#ffffff" />
  <h1 className='text-[#f5f5f5]'>A bit of introduction</h1>
</div>
<hr className="border border-[#ffffff38] w-full mt-2" />


<div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4">
    <div className='flex items-center gap-5 font-mono mt-4'>
  <CornerDownRight color='grey'/>
  <h2 className='text-[#f3f3f3]'>Shann Michael D. Agang</h2>
</div>

<div className='flex items-center gap-5 font-mono mt-4'>
  <MapPin color='grey'/>
   <h2 className='text-[#f3f3f3]'>Luz, Cebu City, Philippines</h2>
  </div>

  <div className='flex items-center gap-5 font-mono mt-4'>
  <MailDot color='grey'/>
  <h2 className='text-[#f3f3f3]'>Shannmichaelagang<br></br>@gmail.com</h2>
</div>


<div className='flex items-center gap-5 font-mono mt-4'>
  <GraduationCap color='grey'/>
  <h2 className='text-[#f3f3f3]'>Computer Engineering</h2>
</div>
</div>
    
<hr className="border border-[#ffffff38] w-full mt-10" />

<div className=' w-full md:mb-20 md:pb-20 mt-4 text-sm md:overflow-hidden md:h-fit'><p className='text-[#d0d0d0] font-mono'>I am a Computer Engineering student at the University of Cebu specializing in software design, local databases, and network infrastructure. I focus on building clean, reliable systems using a first-principles approach.</p></div>


      </div>
      </div>


    <div className="row-span-3 row-start-8 border border-[#ffffff4d] bg-[#171717] p-2 rounded-md  md:col-span-2 md:row-span-2 md:row-start-4"><div className=" h-full rounded-md flex flex-col items-center justify-center gap-5">
      <h1 className='inline-block font-mono text-[#f3f3f3]' >Skills / Stacks</h1>
      <hr className="border border-[#ffffff38] w-2/4" />
      <LogoLoop logos={[
    { src: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png", alt: "Stack"},
    { src: "https://img.icons8.com/fluency/48/typescript--v1.png", alt: "Stack"},
    { src: "https://img.icons8.com/color/48/html-5--v1.png", alt: "Stack"},
    { src: "https://img.icons8.com/color/96/css3.png", alt: "Stack"},
    { src: "https://img.icons8.com/color/96/javascript--v1.png", alt: "Stack"},
    { src: "https://img.icons8.com/color/96/python--v1.png", alt: "Stack"},
    { src: "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png", alt: "Stack"},
    { src: "https://img.icons8.com/fluency/96/c-plus-plus-logo.png", alt: "Stack"},
    { src: "https://img.icons8.com/fluency/96/sql.png", alt: "Stack"},
  ]}
  speed={60}
  direction="left"
  logoHeight={40}
  gap={80}
  fadeOut/>

  <LogoLoop logos={[
    { src: 'https://img.icons8.com/glyph-neue/64/FFFFFF/github.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/cute-clipart/64/canva-app.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/color/96/adobe-illustrator--v1.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/color/96/adobe-photoshop--v1.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/notion.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/color/96/visual-studio-code-2019.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/fluency/96/docker.png', alt: 'Logo' },
    { src: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-cloudflare-provides-content-delivery-network-services-ddos-mitigation-logo-color-tal-revivo.png', alt: 'Logo' },
  ]}
  speed={60}
  direction="right"
  logoHeight={40}
  gap={80}
  fadeOut/></div></div>

    <div className="row-span-2 row-start-11 border border-[#ffffff4d] bg-[#171717] p-2 rounded-md  md:row-span-2 md:col-start-3 md:row-start-4"><div className=" h-full rounded-md">
      <div className='flex items-center gap-5 font-mono'>
        < Scroll color="#ffffff" />
      <h1 className='font-mono text-[#f3f3f3]' >Current Focus</h1>
      </div>
      <hr className="border border-[#ffffff38] w-full mt-2" />
      </div>
      </div>
</div>
    </AutoReveal>
    
    
    
        </div>
      </section>



       <section className="bg-[#121212] h-screen w-full flex justify-center">
                <div className="bg-red-500 w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:w-full lg:w-4/5"></div>
        </section>


             <section className="bg-[#121212] h-screen w-full flex justify-center">
                <div className="bg-purple-400 w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:w-full lg:w-4/5"></div>
        </section>
    </div>
  );
}

export default App;
