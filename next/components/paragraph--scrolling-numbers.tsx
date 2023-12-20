import { ScrollingNumbers } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "./heading--paragraph";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function ParagraphScrollingNumbers({
  paragraph,
}: {
  paragraph: ScrollingNumbers;
}) {
  if (!paragraph.field_scrolling_numbers_items?.length) return null;

  const Counter = ({ from, to, duration }) => {
    const count = useMotionValue(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
      if (isInView) {
        animate(count, to, { duration: duration });
      }
    }, [isInView]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
  };

  return (
    <section id="scrolling_numbers" className="my-6">
      <h2
        className={
          "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md"
        }
      >
        {paragraph.field_heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-primary-600 py-8 px-4 rounded-md mt-6">
        {paragraph.field_scrolling_numbers_items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-bold text-white" style={{ fontSize: "64px" }}>
              {/* Larger numerical values, such as years, are not subjected to animation for better readability and performance. */}
              {item.field_number >= 1000 ? (
                <span>{item.field_number}</span>
              ) : (
                <Counter from={0} to={item.field_number} duration={2} />
              )}
              <span>{item.field_number_suffix}</span>
            </p>
            <p className="text-xs text-rose text-transform: uppercase">
              {item.field_description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
