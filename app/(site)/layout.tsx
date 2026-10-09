import { Cursor } from "@/components/Cursor";
import { Floaty, Star } from "@/components/Shapes";
import { BackToTop } from "@/components/BackToTop";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-full focus:border-[2.5px] focus:border-line focus:bg-yellow focus:px-5 focus:py-2 focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <SiteHeader name={profile.name} />
      <main id="main">{children}</main>
      <footer className="relative mt-12 overflow-hidden border-t-[2.5px] border-line bg-violet text-ink">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-display text-xl font-extrabold">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center gap-5">
            <Floaty className="size-9 text-yellow" rotate={20}>
              <Star className="size-full" />
            </Floaty>
            <BackToTop />
          </div>
        </div>
      </footer>
    </MotionProvider>
  );
}
