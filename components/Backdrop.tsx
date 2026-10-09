// Fixed aurora glows plus a grain overlay. Pure CSS, no JS, sits behind everything.
export function Backdrop() {
  return (
    <div aria-hidden="true" className="backdrop">
      <span className="aurora aurora-1" />
      <span className="aurora aurora-2" />
      <span className="aurora aurora-3" />
      <span className="grain" />
    </div>
  );
}
