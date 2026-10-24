import { useRef } from "react"
import { motion } from "framer-motion";
import Profile from './Profile';


function App() {
  const dragZoneRef = useRef(null)

  return (
    <motion.div>

      <section className="bg-[#121212] h-screen w-full flex justify-center">

        <div className="bg-blue-500 w-full p-5 flex flex-col items-center justify-center  sm:w-3/4 md:w-3/4 xl:p-20" >

          <h1 className="text-[#f5f5f5] font-bebas text-center text-5xl sm:text-7xl 2xl:text-8xl">
            Shann Michael <br></br>Agang
          </h1>

          <h3 className="text-[#f3f3f3] font-mono mt-5 mb-3 xl 2xl:text-1xl">Software Engineer</h3>

          <p className="text-[#d0d0d0] font-mono text-center text-lg mt-10 lg:w-2/3 2xl:text-1xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus autem, quibusdam incidunt fugit enim cupiditate? Praesentium, quos cumque architecto dignissimos odio asperiores earum distinctio unde dicta assumenda eos culpa. Quis debitis ratione tempore quae. Soluta accusamus a doloremque.
          </p>

        </div>
      </section>


      <section className="bg-[#121212] h-screen w-full flex justify-center">
        <div className="bg-blue-400 w-full p-5 flex flex-col items-center justify-center sm:w-3/4 md:w-full lg:w-4/5">
        <Profile />
        </div>
      </section>
    </motion.div>
  );
}

export default App;
