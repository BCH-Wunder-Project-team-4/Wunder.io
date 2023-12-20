import { StoryBlock as StoryBlockType } from "@/lib/zod/paragraph";

export function ParagraphStoryBlock({
  paragraph,
}: {
  paragraph: StoryBlockType;
}) {
  return (
    <section id="story-block" className="my-4">
      {paragraph.field_heading && (
        <h2
          className={
            "leading-none max-w-2xl text-left text-heading-sm font-bold tracking-tight text-primary-600 dark:text-fog md:text-heading-md mb-4"
          }
        >
          {paragraph.field_heading}
        </h2>
      )}
      {paragraph.field_text && (
        <p className="mb-8 max-w-2xl text-left text-md/xl mt-4 text-steelgray dark:text-mischka">
          {paragraph.field_text}
        </p>
      )}
      {paragraph.field_story_items && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {paragraph.field_story_items.map((story) => (
            <div
              key={story.field_heading}
              className="text-steelgray dark:text-mischka border-2 border-finnishwinter dark:border-scapaflow p-4 rounded"
            >
              <h3 className="font-bold text-lg mb-4">{story.field_heading}</h3>
              <p className="text-md">{story.field_text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
