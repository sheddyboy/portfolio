"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="wrap flex min-h-dvh flex-col justify-between py-10">
      <p className="mono-label text-accent">Error / 500</p>
      <div>
        <h1 className="display text-[clamp(5rem,24vw,22rem)] leading-[0.8] text-accent">Oops</h1>
        <p className="display mt-4 text-[clamp(2rem,6vw,5rem)]">Something went wrong</p>
      </div>
      <button type="button" onClick={reset} className="btn btn-solid w-fit">
        Try again
      </button>
    </main>
  );
}
