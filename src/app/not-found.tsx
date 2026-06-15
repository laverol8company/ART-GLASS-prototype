import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[80svh] place-items-center px-6 py-32 text-center">
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-xs tracking-[0.2em] text-muted-2 uppercase">
          Помилка 404
        </span>
        <h1 className="max-w-[16ch] font-display text-4xl font-medium tracking-[-0.02em] text-bone sm:text-6xl">
          Цієї сторінки не видно.
        </h1>
        <p className="measure text-muted">
          Можливо, її відполірували надто ретельно. Повертайтесь на головну —
          там усе прозоро.
        </p>
        <Link
          href="/"
          className="rounded-pill bg-bone px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          На головну
        </Link>
      </div>
    </main>
  );
}
