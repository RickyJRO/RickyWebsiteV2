import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
} from "./components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./features/store";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { IProject } from "./features/models";
import { setProjects, setTestimonials } from "./features/counter/appSlice";
import { motion } from "framer-motion";
import react from "./assets/react.png";

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const { testimonials, projects } = useSelector(
    (state: RootState) => state.app
  );
  const dispatch = useDispatch();

  const getTestimonials = async () => {
    const testimonials: DocumentData[] = [];
    await getDocs(collection(db, "Testimonials"))
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((e) => {
          testimonials.push(e.data());
        });
      })
      .then(() => {
        dispatch(setTestimonials(testimonials));
      });
  };

  const getProjects = async () => {
    function shuffle(array: any) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    const projects: IProject[] = [];
    await getDocs(collection(db, "projects"))
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((e: any) => {
          projects.push(e.data());
        });
      })
      .then(() => {
        dispatch(setProjects(shuffle(projects)));
      });
  };

  React.useEffect(() => {
    getTestimonials();
    getProjects();
  }, []);

  React.useEffect(() => {
    if (testimonials && projects) {
      setLoading(false);
    }
  }, [testimonials, projects]);
  return (
    <BrowserRouter>
      {loading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img style={{ width: "20vw" }} src={react} />
          </motion.div>
        </div>
      ) : (
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
