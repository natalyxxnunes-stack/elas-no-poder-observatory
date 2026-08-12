/**
 * PullQuote — princípio editorial isolado entre seções. Só frases de método;
 * nunca números (número exige denominador e data colados).
 */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="py-10 md:py-14">
      <p className="mx-auto max-w-3xl border-l-4 border-solar pl-5 font-display text-2xl leading-[1.15] text-plum md:pl-8 md:text-4xl">
        {children}
      </p>
    </aside>
  );
}
