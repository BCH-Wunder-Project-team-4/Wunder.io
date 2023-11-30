export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-left text-primary-600 dark:text-mischka text-heading-md font-bold md:text-heading-lg">
      {children}
    </h2>
  );
}
