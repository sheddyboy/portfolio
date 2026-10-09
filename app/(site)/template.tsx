// Re-mounts on every navigation inside (site), replaying the colour-bar wipe (pure CSS).
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="wipe">
        <span />
        <span />
        <span />
      </div>
      {children}
    </>
  );
}
