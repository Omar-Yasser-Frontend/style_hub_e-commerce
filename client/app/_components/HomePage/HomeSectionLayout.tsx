import SectionHeading from "../SectionHeading";

type HomeSectionLayoutProps = {
  headText: string;
  children: React.ReactNode;
};

function HomeSectionLayout({ headText, children }: HomeSectionLayoutProps) {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{headText}</SectionHeading>
        {children}
      </div>
    </section>
  );
}

export default HomeSectionLayout;
