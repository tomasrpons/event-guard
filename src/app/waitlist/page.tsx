"use client";

import { motion } from "framer-motion";
import Logo from "~/components/logo";
import WaitlistButton from "~/components/waitlist-button";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#14afff] to-[#0852a0]">
      <motion.div variants={container} initial="hidden" animate="visible">
        <Logo />
        <motion.h1
          className="mt-4 text-center text-2xl text-primary-foreground"
          variants={item}
        >
          Market data en tiempo real
        </motion.h1>
        <form className="mt-8 w-full max-w-md p-4">
          <motion.div variants={item} className="flex flex-col space-y-4">
            <motion.input
              variants={item}
              aria-label="Email address"
              className="w-full rounded bg-primary-foreground px-4 py-2 text-gray-700"
              id="email"
              placeholder="Ingresa tu email"
              type="email"
            />
            <WaitlistButton>Unirse a la Waitlist</WaitlistButton>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
