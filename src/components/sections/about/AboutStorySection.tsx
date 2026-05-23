"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function AnimatedText({
  children,
  className,
  initialX = 40,
}: {
  children: React.ReactNode;
  className?: string;
  initialX?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasStarted, setHasStarted] = useState(false);
  
  const springValue = useSpring(0, {
    duration: 2000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      springValue.set(end);
    }
  }, [isInView, end, springValue, hasStarted]);

  return (
    <span ref={ref} className="inline-flex">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export default function AboutStorySection() {
  return (
    <section className="flex flex-col w-full">
      {/* Block 1 */}
      <div className="flex flex-col md:flex-row bg-[#ffffff] w-full max-w-[1440px] mx-auto">
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
          <Image
            src="/img/about/about-1.webp"
            alt="Development team working on tasks"
            fill
            className="object-cover md:rounded-r-[24px] shadow-[var(--shadow-deep-about)]"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center p-[24px] md:py-[64px] md:pl-[64px] md:pr-[5%]">
          <AnimatedText initialX={40}>
            <h3 className="font-bricolage text-[24px] md:text-[28px] font-semibold text-[#23272e] tracking-[-0.5px] leading-[1.5]">
              You give them a requirement, they build it, and they send you a bill even if that feature is a mistake for your business. They focus on clearing tickets, while you&apos;re left worrying if the product will actually survive the market.
            </h3>
          </AnimatedText>
        </div>
      </div>

      {/* Block 2 */}
      <div className="flex flex-col md:flex-row-reverse bg-[#f8f8f8] w-full max-w-[1440px] mx-auto">
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
          <Image
            src="/img/about/about-2.webp"
            alt="Business collaboration and requirement gathering"
            fill
            className="object-cover md:rounded-l-[24px] shadow-[var(--shadow-deep-about)]"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center p-[24px] md:py-[64px] md:pr-[64px] md:pl-[5%]">
          <AnimatedText initialX={-40}>
            <h2 className="font-bricolage text-[32px] md:text-[40px] font-bold text-[#23272e] tracking-[-0.64px] leading-[1.2]">
              We started AANANDI in <span className="text-[#1746ea]">2023</span> because you don&apos;t need more &apos;order takers.&apos;
            </h2>
          </AnimatedText>
        </div>
      </div>

      {/* Block 3 */}
      <div className="flex flex-col md:flex-row bg-[#ffffff] w-full max-w-[1440px] mx-auto">
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
          <Image
            src="/img/about/about-3.webp"
            alt="About Aanandi"
            fill
            className="object-cover md:rounded-r-[24px] shadow-[var(--shadow-deep-about)]"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center p-[24px] md:py-[64px] md:pl-[64px] md:pr-[5%]">
          <AnimatedText initialX={40}>
            <h3 className="font-bricolage text-[24px] md:text-[28px] font-semibold text-[#23272e] tracking-[-0.5px] leading-[1.5]">
              You need a partner who understands that every dollar you spend is a bet on your future. We don&apos;t just write code; we consult. If we see a path that is faster, cheaper, or better for your users, we tell you.
            </h3>
          </AnimatedText>
        </div>
      </div>

      {/* Block 4 */}
      <div className="flex flex-col md:flex-row-reverse bg-[#f8f8f8] w-full max-w-[1440px] mx-auto">
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
          <Image
            src="/img/about/about-4.webp"
            alt="About Aanandi partnership"
            fill
            className="object-cover md:rounded-l-[24px] shadow-[var(--shadow-deep-about)]"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-[24px] md:py-[64px] md:pr-[64px] md:pl-[5%]">
          <div className="flex flex-col items-center w-full max-w-[400px]">
            <div className="flex flex-col items-center py-[24px] w-full">
              <div className="font-bricolage text-[56px] md:text-[72px] font-bold text-[#1746ea] leading-none">
                <CountUp end={34} suffix="+" />
              </div>
              <div className="text-[16px] md:text-[18px] font-medium text-[#23272e] mt-[8px]">
                Experts
              </div>
            </div>
            
            <div className="h-[1px] w-full bg-[#e5e7eb]"></div>
            
            <div className="flex flex-col items-center py-[24px] w-full">
              <div className="font-bricolage text-[56px] md:text-[72px] font-bold text-[#1746ea] leading-none">
                <CountUp end={99} suffix="%" />
              </div>
              <div className="text-[16px] md:text-[18px] font-medium text-[#23272e] mt-[8px]">
                Satisfaction
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#e5e7eb]"></div>
            
            <div className="flex flex-col items-center py-[24px] w-full">
              <div className="font-bricolage text-[56px] md:text-[72px] font-bold text-[#1746ea] leading-none">
                <CountUp end={10} suffix="+" />
              </div>
              <div className="text-[16px] md:text-[18px] font-medium text-[#23272e] mt-[8px]">
                Years
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Image Overview */}
      <div className="w-full px-[5%] pb-[80px]">
        <div className="max-w-[1280px] w-full mx-auto mt-[80px] rounded-[24px] overflow-hidden shadow-[var(--shadow-deep-about)]">
          <Image
            src="/img/about/Mobile.webp"
            alt="Aanandi Overview Mobile"
            width={1280}
            height={800}
            className="w-full h-auto block sm:hidden"
          />
          <Image
            src="/img/about/Tab.webp"
            alt="Aanandi Overview Tablet"
            width={1280}
            height={800}
            className="w-full h-auto hidden sm:block lg:hidden"
          />
          <Image
            src="/img/about/Desktop.png"
            alt="Aanandi Overview Desktop"
            width={1280}
            height={800}
            className="w-full h-auto hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}
