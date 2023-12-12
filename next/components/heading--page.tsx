export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-left text-heading-md font-bold md:text-heading-lg text-primary-600 dark:text-fog">
      {children}
    </h1>
  );
}
