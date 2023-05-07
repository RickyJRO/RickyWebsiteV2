import React from "react";
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
const FeedbackCard = ({ description, name, role, uid, userImage, index }) => (
  <motion.div
    className="bg-black-100 p-8 rounded-3xl xs:w-[320px] w-full"
    style={{ width: 320 }}
  >
    <p className="text-white font-black text-[48px]" style={{ fontSize: 48 }}>
      "
    </p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px]">{description}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
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
  const { testimonials } = useSelector((state: RootState) => state.app);

  return (
    <div className={`mt-12 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
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
            <SwiperSlide>
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
  );
};

export default SectionWrapper(Feedbacks, "");
