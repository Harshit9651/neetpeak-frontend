import WaveCardMentors from "../../../components/wavecardcarousel/WaveCardMentors";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const headerVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};


function Mentors() {
  return <div>
    <motion.h1
              className="font-extrabold leading-[1.25] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={headerVariants}
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <span className="text-gray-900">Our Mentorship </span>
              <span className="text-[#4B8DE0]">Pricing Plans</span>
            </motion.h1>
    <WaveCardMentors/>
  </div>;
}

export default Mentors;
