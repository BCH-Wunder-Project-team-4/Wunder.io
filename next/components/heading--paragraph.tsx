export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-left text-primary-600 dark:text-fog text-heading-md font-bold md:text-heading-lg" data-aos="fade">
      {children}
    </h2>
  );
}
