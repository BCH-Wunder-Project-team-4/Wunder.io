import { ScrollingNumbers } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "./heading--paragraph";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ParagraphScrollingNumbers({
  paragraph,
}: {
  paragraph: ScrollingNumbers;
}) {
  if (!paragraph.field_scrolling_numbers_items?.length) return null;

  const Counter = ({ from, to, duration }) => {
    const count = useMotionValue(from);
    const ref = useRef(null);
    // const { scrollYProgress } = useScroll();
    const isInView = useInView(ref, { once: true });
    const [hasAnimated, setHasAnimated] = useState(false);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
      if (isInView && !hasAnimated) {
        animate(count, to, { duration: duration });
        setHasAnimated(true);
      }
    }, [count, to, duration, isInView, hasAnimated]);

    return (
      <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {rounded}
      </motion.span>
    );
  };

  return (
    <section id="scrolling_numbers">
      <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      <div className="h-36"></div>
      <div className="flex flex-row">
        {paragraph.field_scrolling_numbers_items.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-5">
            <p className="font-bold text-2xl">
              <Counter from={0} to={item.field_number} duration={2} />
              <span>{item.field_number_suffix}</span>
            </p>
            <div className="text-2xl">{item.field_description}</div>
          </div>
        ))}
      </div>
      <div className="h-36"></div>
    </section>
  );
}
