import { Backdrop } from "@/components/Backdrop";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();
  return (
    <MotionProvider>
      <Backdrop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <SiteHeader name={profile.name} />
      <main id="main">{children}</main>
      <footer className="px-4 pb-8 sm:px-6">
        <div className="glass mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </MotionProvider>
  );
}
