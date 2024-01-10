/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { type MouseEvent, useEffect, useRef, useState } from "react";

type WaitlistButtonProps = {
  children: React.ReactNode;
};

const WaitlistButton: React.FC<WaitlistButtonProps> = ({ children }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isHovered, setHovered] = useState(false);
  const [tracking, setTracking] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const previousTimeout = useRef<any>(null);
  const motionValue = useMotionValue(position.x + position.y);

  useEffect(() => {
    motionValue.set(position.x + position.y);
  }, [position.x, position.y]);
  const bgColor = useTransform(motionValue, [0, 178], ["#00166d", "#f8fafc"]);

  return (
    <motion.a
      target="_blank"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => {
        if (ref.current) {
          const coordinates = getRelativeCoordinates(
            event as unknown as MouseEvent<HTMLAnchorElement, MouseEvent>,
            ref.current,
          );

          if (previousTimeout.current) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearTimeout(previousTimeout.current);
          }
          setTracking(true);

          setPosition({
            x: coordinates.x,
            y: coordinates.y,
          });
          if (previousTimeout.current) {
            previousTimeout.current = setTimeout(() => {
              setTracking(false);
            }, 500);
          }
        }
      }}
      className="relative cursor-pointer rounded-md text-sm font-semibold text-white shadow-2xl shadow-[#fffff] saturate-100"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.01 : 1,
          transition: {
            type: "spring",
            bounce: 0.6,
          },
        }}
        className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-md bg-[#0a3261] text-lg "
      >
        {Array.from({
          length: 6,
        }).map((_, i) => (
          <AnimatePresence>
            {tracking && (
              <motion.div
                key={i}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3 * i, ease: "easeIn" },
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  left: position.x - 20 / 2,
                  top: position.y - 20 / 2,
                  transition: {
                    duration: 0.2 * i,
                    ease: "easeOut",
                  },
                }}
                style={{
                  width: 10,
                  height: 10,
                  left: position.x - 20 / 2,
                  top: position.y - 20 / 2,
                  backgroundColor: bgColor,
                }}
                className="pointer-events-none absolute z-0 rounded-full blur-[16px]"
              />
            )}
          </AnimatePresence>
        ))}
      </motion.div>
      <div className="relative flex items-center overflow-hidden rounded-md">
        <div className=" z-10 flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 shadow-lg shadow-[#fffff]">
          {children}
        </div>
      </div>
    </motion.a>
  );
};

function getRelativeCoordinates(
  event: MouseEvent<HTMLAnchorElement, MouseEvent>,
  referenceElement: HTMLAnchorElement,
) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  let reference = referenceElement.offsetParent as unknown as any;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY:
      (position.y - offset.top - offset.height / 2) / (offset.height / 2),
  };
}

export default WaitlistButton;
