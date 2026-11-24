import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/Button'
import { TypingText } from '@/components/lightswind/typing-text'
import { hasIntroPlayed, markIntroPlayed } from '@/lib/intro'
import profileImg from '@/assets/Profile3.webp'
import ciscoLogo from '@/assets/CiscoLogo.webp'
import ibmLogo from '@/assets/IBMLOGO.webp'
import codedexLogo from '@/assets/CodedexLogo.webp'
import certificationsReveal from '@/assets/CertificationsReveal.webp'
import ButtonImage from '@/ButtonImage';
import { UserRoundPen, Home as HomeIcon, FolderOpen, Mail } from 'lucide-react'
import Dock from '@/components/lightswind/dock'
import { CornerDownRight, ArrowUpRight } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { MailDot } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { LogoLoop } from '@/components/LogoLoop';
import { ChevronDown } from 'lucide-react';
import AutoReveal from '@/components/AutoReveal'
import { Scroll } from 'lucide-react';
import { AnimatedCopyButton } from "@/components/lightswind/animated-copy-button"
import ProjectSection from '@/ProjectSection';
import { GlowingCards, GlowingCard } from "@/components/lightswind/glowing-cards"
import { BadgeCheck } from 'lucide-react';


function Home() {
  const [atTop, setAtTop] = useState(true)
  const introPlayed = useRef(hasIntroPlayed()).current
  const [typingDone, setTypingDone] = useState(introPlayed)
  const [showDock, setShowDock] = useState(false)

  // Scroll to a hash target (e.g. /#connect) once the page has mounted
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0)
      // sidebar dock appears once the hero (100vh) is scrolled past
      setShowDock(window.scrollY > window.innerHeight * 0.9)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dockItems = [
    {
      icon: <HomeIcon size={20} />,
      label: 'Home',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    {
      icon: <UserRoundPen size={20} />,
      label: 'About',
      onClick: () => document.querySelector('#About')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <FolderOpen size={20} />,
      label: 'Projects',
      onClick: () => document.querySelector('#Project')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <BadgeCheck size={20} />,
      label: 'Certifications',
      onClick: () => document.querySelector('#Certifications')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: <Mail size={20} />,
      label: 'Connect',
      onClick: () => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ]

  return (
    
    <div>

      {/* sidebar dock: appears once the hero (100vh) is scrolled past, slides in from the left.
          Exits (outro) back out to the left when the user scrolls back to the hero. */}
      <AnimatePresence>
        {showDock && (
          <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Dock items={dockItems} labelPosition="right" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className=" h-screen w-full flex justify-center">
        
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
            instant={introPlayed}
>
            Shann Michael <br />Agang
          </TypingText>
          </AutoReveal>
 <AutoReveal>
          <TypingText
            as="h3"
            className="text-[#f3f3f3]  mt-5 mb-3 xl 2xl:text-1xl"
            fontSize=""
            fontWeight=""
            color=""
            letterSpacing=""
            align="center"
            duration={2}
            instant={introPlayed}
          >
            Software Engineer
          </TypingText>
</AutoReveal>
 <AutoReveal className="w-full flex justify-center">
          <TypingText
            as="p"
            className="text-[#d0d0d0]  font-extralight text-center text-sm md:text-base mt-10 lg:w-2/3 2xl:text-xl"
            fontSize=""
            fontWeight="font-extralight"
            color=""
            letterSpacing=""
            align="center"
            duration={2}
            lockScroll={!introPlayed}
            instant={introPlayed}
            onComplete={() => {
              markIntroPlayed()
              setTypingDone(true)
            }}
          >
As a dedicated computer engineering student, I combine a strong technical foundation with a true passion for full stack development.<br />
I love building responsive web applications, mastering new coding frameworks, and turning creative concepts into vibrant digital reality.
          </TypingText>
          </AutoReveal>

<AutoReveal translate={false} blur={false}>
<div className={`transition-opacity duration-300 ${typingDone ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}>

  <Button />

</div>
</AutoReveal>


<div className={`transition-opacity duration-300 ease-out ${atTop && typingDone ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}>
                  <h3 className='text-gray-400 opacity-4 text-sm'>Scroll Down</h3>
                  <ChevronDown className='text-gray-400 w-4 h-4 animate-bounce md:mt-2 block mx-auto' />
                </div>
        </div>
      </section>



  <section id='About' className=" mt-40 overflow-hidden h-auto w-full flex justify-center pb-44">


        
        <div className="w-full min-[370px]:w-11/12 p-5  md:pb-20 flex flex-col items-center justify-center sm:w-full md:overflow-hidden md:w-full lg:w-3/4 xl:w-3/4 2xl:w-2/4 lg:overflow-x-hidden h-auto ">
<AutoReveal direction="left">
          <h1 className="text-[#f5f5f5] font-bebas text-center mb-5 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
            about
          </h1>
</AutoReveal>

<div className=" h-auto w-full grid grid-cols-1 grid-rows-[repeat(12,auto)] gap-4 md:h-3/4 md:grid-cols-3 md:grid-rows-5 z-10">

        <AutoReveal className="row-span-3 border border-[#ffffff4d] bg-[#151515] p-2 rounded-md">
          <div className="bg-yellow-200 h-full rounded-md overflow-hidden"><img src={profileImg} alt='Profile Picture' loading="lazy" decoding="async" className="w-full h-full object-cover" /></div>
        </AutoReveal>

    <AutoReveal className="row-span-4 row-start-4 border border-[#ffffff4d] bg-[#151515]  p-2 rounded-md  md:col-span-2 md:row-span-3">
<div className="h-full rounded-md">
<div className=" flex items-center gap-5">
<UserRoundPen color="#ffffff" size="1em" />
  <h1 className='text-[#f3f3f3]'>A bit of introduction</h1>
</div>
<hr className="border-t border-[#ffffff38] w-full mt-2" />


<div className="md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4">
    <div className='flex items-center gap-5  mt-4'>
  <CornerDownRight color='grey' size="1em" className="text-sm md:text-base"/>
  <h2 className='text-[#f3f3f3] text-sm md:text-base '>Shann Michael D. Agang</h2>
</div>

<div className='flex items-center gap-5  mt-4'>
  <MapPin color='grey' size="1em" className="text-sm md:text-base"/>
   <h2 className='text-[#f3f3f3] text-sm md:text-base'>Luz, Cebu City, Philippines</h2>
  </div>

  <div className='flex items-center gap-5  mt-4'>
  <MailDot color='grey' size="1em" className="text-sm md:text-base"/>
  <h2 className='text-[#f3f3f3] text-sm md:text-base'>Shannmichaelagang<br></br>@gmail.com</h2>
   <AnimatedCopyButton textToCopy='Shannmichaelagang@gmail.com' size='sm'/>
</div>


<div className='flex items-center gap-5  mt-4'>
  <GraduationCap color='grey' size="1em" className="text-sm md:text-base"/>
  <h2 className='text-[#f3f3f3] text-sm md:text-base'>Computer Engineering</h2>
</div>
</div>
    
<hr className="border-t border-[#ffffff38] w-full mt-10" />

<div className=' w-full md:mb-20 md:pb-20 mt-4 text-sm md:text-base md:overflow-hidden md:h-fit'><p className='text-[#d0d0d0] '>I am a Computer Engineering student at the University of Cebu specializing in software design, local databases, and network infrastructure. I focus on building clean, reliable systems using a first-principles approach.</p></div>


      </div> 

      </AutoReveal>

        <AutoReveal rootMargin="0px 0px -15% 0px" className="row-span-3 row-start-8 border border-[#ffffff4d] bg-[#151515] p-2 rounded-md md:col-span-2 md:row-span-2 md:row-start-4">
          <div className="h-full rounded-md flex flex-col items-center justify-center gap-5">
            <h1 className='inline-block text-[#f3f3f3]' >Skills & Stacks</h1>
            <hr className="border-t border-[#ffffff38] w-2/4" />
            <LogoLoop logos={[
              { src: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png", alt: "Stack"},
              { src: "https://img.icons8.com/fluency/48/typescript--v1.png", alt: "Stack"},
              { src: "https://img.icons8.com/color/48/html-5--v1.png", alt: "Stack"},
              { src: "https://img.icons8.com/color/96/css3.png", alt: "Stack"},
              { src: "https://img.icons8.com/color/96/javascript--v1.png", alt: "Stack"},
              { src: "https://img.icons8.com/color/96/python--v1.png", alt: "Stack"},
              { src: "https://img.icons8.com/color/96/java-coffee-cup-logo--v1.png", alt: "Stack"},
              { src: "https://img.icons8.com/fluency/96/c-plus-plus-logo.png", alt: "Stack"},
              { src: "https://img.icons8.com/fluency/96/sql.png", alt: "Stack"}
            ]} speed={60} direction="left" logoHeight={40} gap={80} fadeOut scaleOnHover />

            <LogoLoop logos={[
              { src: 'https://img.icons8.com/glyph-neue/64/FFFFFF/github.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/cute-clipart/64/canva-app.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/color/96/adobe-illustrator--v1.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/color/96/adobe-photoshop--v1.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/ios-filled/50/FFFFFF/notion.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/color/96/visual-studio-code-2019.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/fluency/96/docker.png', alt: 'Logo' },
              { src: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-cloudflare-provides-content-delivery-network-services-ddos-mitigation-logo-color-tal-revivo.png', alt: 'Logo' }
            ]} speed={60} direction="right" logoHeight={40} gap={80} fadeOut scaleOnHover />
          </div>
        </AutoReveal>

        <AutoReveal rootMargin="0px 0px -15% 0px" className=" row-span-2 row-start-11 border border-[#ffffff4d] bg-[#151515] p-2 rounded-md md:row-span-2 md:col-start-3 md:row-start-4 md:pb-5 xl:pb-20">
          <div className="md:max-xl:pb-20 rounded-md">
            <div className='flex items-center gap-5'>
              <Scroll color="#ffffff" size="1em" />
              <h1 className=' text-[#f3f3f3]' >Milestone</h1>
            </div>
            <hr className="border-t border-[#ffffff38] w-full mt-2" />
            <div className='flex-col text-xs mt-2'>
              <h1 className='text-white'>Hines</h1>
              <div className='flex justify-between w-full'>
                <p className='text-gray-500'>Sr. Software Engineer</p>
                <p className='text-gray-500'>2021-Present</p>
              </div>
            </div>
            <div className='flex-col text-xs mt-4'>
              <h1 className='text-white'>Hines</h1>
              <div className='flex justify-between w-full'>
                <p className='text-gray-500'>Sr. Software Engineer</p>
                <p className='text-gray-500'>2021-Present</p>
              </div>
            </div>
            <div className='flex-col text-xs mt-4'>
              <h1 className='text-white'>Hines</h1>
              <div className='flex justify-between w-full'>
                <p className='text-gray-500'>Sr. Software Engineer</p>
                <p className='text-gray-500'>2021-Present</p>
              </div>
            </div>
            
              <div className=' pb-2 flex items-center justify-center gap-1 text-sm mt-8 text-center group'>
              
              <a href="#" className='text-gray-200 hover:text-blue-400 relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</a><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/>
            </div>
          </div>
        </AutoReveal>

<AutoReveal className=" row-span-2 row-start-16 md:col-start-2 md:row-start-6  justify-center flex"><ButtonImage label="About Me" href="/about"/></AutoReveal>

      </div>

  </div>
</section>



       <section id='Project' className="pt-40 sm:pt-0 overflow-hidden h-auto w-full flex justify-center [content-visibility:auto] [contain-intrinsic-size:auto_600px] ">
                <div className=" w-full p-5 md:pt-0 flex flex-col items-center justify-center sm:w-full md:overflow-x-hidden md:w-full lg:w-3/4 xl:w-3/4 2xl:w-2/4 lg:overflow-x-hidden h-auto overflow-hidden pb-44">
<AutoReveal direction="left">
          <h1 className="text-[#f5f5f5] font-bebas text-center mb-5 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
            Projects
          </h1>
</AutoReveal>
<AutoReveal>
                <ProjectSection />
</AutoReveal>
<AutoReveal>
  <ButtonImage label="View Projects" href="/projects" />
</AutoReveal>
                </div>
        </section>


             <section id='Certifications' className="overflow-hidden h-auto w-full flex justify-center pb-80 pt-40">
                <div className=" w-full flex flex-col items-center justify-center sm:w-full md:w-full lg:w-4/5">
                <AutoReveal direction="left">
          <h1 className="text-[#f5f5f5] font-bebas text-center mb-5 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
            Certifications
          </h1>
</AutoReveal>
<GlowingCards padding='' className="md:px-10 lg:px-0">
<AutoReveal className="flex-1 min-w-[13rem] w-4/5">
<GlowingCard glowColor="#60a5fa" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>NetAcad</h1>
    </div>
    <div className=' w-20 lg:w-24 h-14 ml-auto border border-[#ffffff4d]  p-2  rounded-md' >
      <img src={ciscoLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover'/>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3 group"><a href="#" className='text-gray-300 hover:text-blue-600 relative inline-block text-sm after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</a><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></div> 
  </GlowingCard>
</AutoReveal>


<AutoReveal className="flex-1 min-w-[13rem] w-4/5">
<GlowingCard glowColor="#4ade80" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>NetAcad</h1>
    </div>
    <div className=' w-20 lg:w-24 h-14 ml-auto border border-[#ffffff4d]  p-2  rounded-md' >
      <img src={ibmLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover'/>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3 group"><a href="#" className='text-gray-300 hover:text-blue-600 relative inline-block text-sm after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</a><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></div> 
  </GlowingCard>
</AutoReveal>


<AutoReveal className="flex-1 min-w-[13rem] w-4/5 sm:max-w-[calc((100%-2.5rem)/2)]">
<GlowingCard glowColor="#facc15" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>Codedex</h1>
    </div>
    <div className=' w-20 lg:w-24 h-14 ml-auto border border-[#ffffff4d]  p-1  rounded-md overflow-hidden' >
      <img src={codedexLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover scale-110'/>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3 group"><a href="#" className='text-gray-300 hover:text-blue-600 relative inline-block text-sm after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</a><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></div> 
  </GlowingCard>
</AutoReveal>
     

</GlowingCards>
  <ButtonImage label="More Certifications" href="/certifications" image={certificationsReveal} />
                </div>
        </section>

      <section id='connect' className=" overflow-hidden h-auto w-full flex justify-center pb-44">
        <div className=" w-full p-5 flex flex-col items-center justify-center lg:w-4/5">
          <AutoReveal direction="left" className="w-full md:pl-10 lg:pl-0">
            <h1 className=" text-[#f5f5f5] font-bebas text-center mb-8 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Connect
            </h1>
          </AutoReveal>
          <div className='w-1/2 h-auto flex items-center justify-center gap-8 md:gap-12'>
            <AutoReveal>
            <a href="https://www.instagram.com/sjysqx/" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
              <span className="absolute h-16 w-16 min-[376px]:max-[425px]:h-14 min-[376px]:max-[425px]:w-14 max-[375px]:h-10 max-[375px]:w-10 rounded-full bg-gradient-to-tr from-amber-400 via-pink-600 to-purple-700 opacity-0 scale-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span className="relative w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-[#e4405f] group-hover:opacity-0 transition-opacity duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios/50/FFFFFF/instagram-new.png)", maskImage: "url(https://img.icons8.com/ios/50/FFFFFF/instagram-new.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
              <img width="48" height="48" src="https://img.icons8.com/fluency/96/instagram-new.png" alt="instagram" className="absolute w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </a>
            </AutoReveal>
            <AutoReveal>
            <a href="https://www.facebook.com/profile.php?id=61584695366129" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
              <span className="absolute h-16 w-16 min-[376px]:max-[425px]:h-14 min-[376px]:max-[425px]:w-14 max-[375px]:h-10 max-[375px]:w-10 rounded-full bg-[#1877f2] opacity-0 scale-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span className="relative w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-[#1877f2] group-hover:opacity-0 transition-opacity duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios/50/FFFFFF/facebook-new.png)", maskImage: "url(https://img.icons8.com/ios/50/FFFFFF/facebook-new.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
              <span className="absolute w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/facebook-new.png)", maskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/facebook-new.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
            </a>
            </AutoReveal>
            <AutoReveal>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
              <span className="absolute h-16 w-16 min-[376px]:max-[425px]:h-14 min-[376px]:max-[425px]:w-14 max-[375px]:h-10 max-[375px]:w-10 rounded-full bg-[#0a66c2] opacity-0 scale-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span className="relative w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-[#0a66c2] group-hover:bg-white transition-colors duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png)", maskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
            </a>
            </AutoReveal>
            <AutoReveal>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
              <span className="absolute h-16 w-16 min-[376px]:max-[425px]:h-14 min-[376px]:max-[425px]:w-14 max-[375px]:h-10 max-[375px]:w-10 rounded-full bg-[#5865f2] opacity-0 scale-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span className="relative w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-[#5865f2] group-hover:bg-white transition-colors duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/discord.png)", maskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/discord.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
            </a>
            </AutoReveal>
            <AutoReveal>
            <a href="https://github.com/SkreTyr" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center">
              <span className="absolute h-16 w-16 min-[376px]:max-[425px]:h-14 min-[376px]:max-[425px]:w-14 max-[375px]:h-10 max-[375px]:w-10 rounded-full bg-[#d3d3d3] opacity-0 scale-50 transition duration-300 group-hover:opacity-100 group-hover:scale-100" />
              <span className="relative w-12 h-12 min-[376px]:max-[425px]:w-10 min-[376px]:max-[425px]:h-10 max-[375px]:w-8 max-[375px]:h-8 md:w-10 md:h-10 bg-[#f5f5f5] group-hover:bg-[#181717] transition-colors duration-300" style={{ WebkitMaskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/github.png)", maskImage: "url(https://img.icons8.com/ios-filled/50/FFFFFF/github.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
            </a>
            </AutoReveal>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;