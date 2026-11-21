export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 relative z-10 bg-transparent pt-[56px] md:pt-[72px]">
      {children}
    </main>
  );
}
