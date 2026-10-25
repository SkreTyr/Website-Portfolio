import { useRef } from "react"
import { motion } from "framer-motion";
import Profile from './Profile';
import Button from './Button'
import { TypingText } from './components/lightswind/typing-text'

function App() {
  const dragZoneRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div>

      <section className="bg-[#121212] h-screen w-full flex justify-center">

        <div className=" w-full p-5 flex flex-col items-center justify-center  sm:w-3/4 md:w-3/4 xl:p-20" >

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

          <h3 className="text-[#f3f3f3] font-mono mt-5 mb-3 xl 2xl:text-1xl">Software Engineer</h3>

          <p className="text-[#d0d0d0] font-mono text-center text-lg mt-10 lg:w-2/3 2xl:text-1xl">
As a dedicated computer engineering student, I combine a strong technical foundation with a true passion for full stack development. I love building responsive web applications, mastering new coding frameworks, and turning creative concepts into vibrant digital reality.
          </p>
          <Button  />
        </div>
      </section>



      <section id='About' className="bg-[#121212] h-screen w-full flex justify-center">
        <div className=" w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:overflow-x-hidden lg:overflow-x-hidden md:w-full">
        <Profile />
        </div>
      </section>



       <section className="bg-[#121212] h-screen w-full flex justify-center">
                <div className="bg-red-400 w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:w-full lg:w-4/5"></div>
        </section>


             <section className="bg-[#121212] h-screen w-full flex justify-center">
                <div className="bg-purple-400 w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:w-full lg:w-4/5"></div>
        </section>
    </motion.div>
  );
}

export default App;
