import { motion } from "framer-motion";
import "./index.css";
import { styles } from "../styles";
import Ricky from "./canvas/Ricky";

const Hero = () => {
  
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute  top-[140px]  max-w-5xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-8 ml-8">
          <div className="w-5 h-5 rounded-full bg-[#2EDBFA]" />
          <div className="w-1 sm:h-60 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#2EDBFA]">Ricardo</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            A Full Stack Developer who specializes in JavaScript Techs across
            the whole stack. (Node.js, Express, React, React Native)
          </p>
        </div>
      </div>
      <div className="model__container">
        <div className="model">
          <Ricky />
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
