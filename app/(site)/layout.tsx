import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <SiteHeader name={profile.name} />
      <main id="main">{children}</main>
      <footer className="overflow-hidden border-t-2 border-foreground">
        <p aria-hidden="true" className="display wrap select-none pt-10 text-[clamp(3rem,14vw,14rem)] leading-[0.85] whitespace-nowrap text-accent">
          {profile.name}
        </p>
        <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p className="mono-label">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
      <CustomCursor />
    </MotionProvider>
  );
}
