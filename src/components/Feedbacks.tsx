import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const FeedbackCard = ({ description, name, role, uid, userImage, index }) => (
  <motion.div
    className="bg-black-100 p-8 rounded-3xl xs:w-[320px] w-full"
    style={{ width: 320 }}
  >
    <p className="text-white font-black text-[48px]" style={{ fontSize: 48 }}>
      "
    </p>

    <div className="mt-0">
      <p className="text-white tracking-wider text-[18px]">{description}</p>

      <div className="mt-6 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">{role}</p>
        </div>

        <img
          src={userImage}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
          style={{ width: 40, height: 40 }}
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const formRef = useRef();
  const [modalVisibility, setModalVisibility] = React.useState<boolean>(false);
  const [triggerAnimation, setTriggerAnimation] =
    React.useState<boolean>(false);
  const { testimonials } = useSelector((state: RootState) => state.app);
  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
  });
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const submitTestimonialFirebase = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(
        collection(db, "Testimonials"),
        where("uid", "==", user.uid)
      );
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        await addDoc(collection(db, "Testimonials"), {
          uid: user.uid,
          description: form.description,
          role: form.role,
          userImage: user.photoURL,
          name: user.email,
        });
        setSubmitted(true);
        setLoading(false);
      } else {
        setLoading(false);
        setError("You already submitted a testimonial, you naughty");
      }
    } catch (err: any) {
      setError("Server error");
      setLoading(false);
      console.error(err);
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name === "" || form.role === "" || form.description === "") {
      setError("Missing fields...");
    } else if (form.name.length < 5) {
      setError("Come on, is that really your name?");
    } else if (form.role.length < 5) {
      setError("Come on, is that really your role?");
    } else if (form.name.length > 30) {
      setError("Name length cannot exceed 30 characters :(");
    } else if (form.role.length > 30) {
      setError("Role length cannot exceed 30 characters :(");
    } else if (form.description.length > 270) {
      setError("Description length cannot exceed 270 characters :(");
    } else {
      setError("");
      submitTestimonialFirebase();
    }
  };
  React.useEffect(() => {
    if (triggerAnimation) {
      setTimeout(() => {
        setModalVisibility(triggerAnimation);
      }, 1000);
    } else {
      setModalVisibility(triggerAnimation);
    }
  }, [triggerAnimation]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <div className={`mt-12 rounded-[20px]`}>
        <motion.div
          animate={{ height: triggerAnimation ? 720 : width < 640 ? 180 : 266 }}
          className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px] testimonialsContainer`}
        >
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What others say</p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
            <div className="testimonialFormContainer">
              <p className="mt-0 text-secondary text-[14px] max-w-3xl leading-[10px]">
                Want to add your testimonial ?
                <span
                  onClick={() => setTriggerAnimation(!modalVisibility)}
                  style={{ color: "#2EDBFA", cursor: "pointer", marginLeft: 4 }}
                >
                  Click here
                </span>
              </p>
              {modalVisibility && (
                <form
                  ref={formRef as any}
                  onSubmit={handleSubmit}
                  className="mt-12 flex flex-row gap-8 flex-wrap "
                >
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Your Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Your role
                    </span>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="What's your role?"
                      className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-4">
                      Your Message
                    </span>
                    <textarea
                      rows={7}
                      style={{ resize: "none" }}
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="What you want to say?"
                      className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
                    />
                  </label>
                  <div className="flex flex-col gap-8 ">
                    {error && (
                      <p className="text-white font-medium mb-4">{error}</p>
                    )}
                    {submitted ? (
                      <p className="text-white font-medium mb-4">
                        Testimonial sent successfully
                      </p>
                    ) : (
                      <button
                        type="submit"
                        className="bg-primary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
                      >
                        {loading ? "Sending..." : "Submit with Google"}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
        <div
          className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}
          style={{ marginTop: -30 }}
        >
          <Swiper
            autoplay={{
              delay: 10500,
              disableOnInteraction: false,
            }}
            spaceBetween={40}
            slidesPerView={3}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              // when window width is >= 1280
              1280: {
                slidesPerView: 3,
              },
              // when window width is >= 768
              768: {
                slidesPerView: 2,
              },
              300: {
                slidesPerView: 1,
              },
            }}
          >
            {testimonials?.map((testimonial, index) => (
              <SwiperSlide key={`${testimonial}-${index}`}>
                <FeedbackCard
                  key={testimonial.name}
                  index={index}
                  {...testimonial}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "");
