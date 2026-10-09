import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-dvh flex-col justify-between py-10">
      <p className="mono-label text-accent">Error / 404</p>
      <div>
        <h1 className="display text-[clamp(6rem,30vw,28rem)] leading-[0.8] text-accent">404</h1>
        <p className="display mt-4 text-[clamp(2rem,6vw,5rem)]">Not found</p>
      </div>
      <Link href="/" className="btn btn-solid w-fit">
        Back home
      </Link>
    </main>
  );
}
