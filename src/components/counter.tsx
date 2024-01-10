import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Counter = (input: { from: number; to: number }) => {
  const { from, to } = input;
  const asFrom = !isNaN(from) ? from : 0;
  const asTo = !isNaN(to) ? to : 0;
  const controls = useAnimation();
  useEffect(() => {
    const animateNumber = async () => {
      await controls.start({
        scale: 1.1, // Scale up to 1.2
        transition: { duration: 0.2 }, // Animation duration
      });

      await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for 1 second

      await controls.start({
        scale: 1, // Return to original scale
        transition: { duration: 0.2 }, // Animation duration
      });
    };

    void animateNumber();
  }, [asFrom, asTo, controls]);

  return <motion.p animate={controls}>{asTo === 0 ? 0 : asTo.toFixed(3)}</motion.p>;
};

export default Counter;
