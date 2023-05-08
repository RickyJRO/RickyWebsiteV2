import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { RootState } from "../features/store";
import { useSelector } from "react-redux";
import { IProject } from "../features/models";

const ProjectCard = ({
  image,
  projectDescription,
  projectLink,
  projectName,
  responsabilityDescription,
  stacks,
  index,
}: IProject & { index: number }) => {
  const returnTagColor = (index: number) =>
    index === 0
      ? "blue-text-gradient"
      : index === 1
      ? "green-text-gradient"
      : "pink-text-gradient";

  return (
    <motion.div style={{ width: "360px" }}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-2 rounded-xl sm:w-[360px] w-full cursor-pointer"
      >
        <div
          onClick={() => window.open(projectLink, "_blank")}
          className="relative w-full h-[230px]"
        >
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div
          onClick={() => window.open(projectLink, "_blank")}
          className="mt-5 p-2"
        >
          <h3 className="text-white font-bold text-[24px]">{projectName}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {projectDescription}
          </p>
        </div>

        <div
          onClick={() => window.open(projectLink, "_blank")}
          className="mt-4 p-2 flex flex-wrap gap-2"
        >
          {stacks.map((tag, indexx) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${returnTagColor(indexx)}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { projects } = useSelector((state: RootState) => state.app);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          live demos in it. It reflects my ability to solve complex problems,
          work with different technologies, and manage projects effectively.
        </p>
      </div>

      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {projects?.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
