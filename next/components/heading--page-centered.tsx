import clsx from 'clsx';

type HeadingPageProps = {
  children: JSX.Element | string;
  className?: string;
};

export function HeadingPage({ children, className }: HeadingPageProps) {
  return (
    <h1 className={clsx("text-center pb-12 pt-14 text-heading-md font-bold text-steelgray md:text-heading-lg", className)}>
      {children}
    </h1>
  );
}
