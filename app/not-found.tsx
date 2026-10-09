import { Backdrop } from "@/components/Backdrop";
import { MotionProvider } from "@/components/MotionProvider";
import { StatusScreen } from "@/components/StatusScreen";

// Handles URLs that match no route at all (outside the (site) group).
export default function RootNotFound() {
  return (
    <MotionProvider>
      <Backdrop />
      <main id="main">
        <StatusScreen code="404" title="Page not found">
          The page you are looking for does not exist or has moved.
        </StatusScreen>
      </main>
    </MotionProvider>
  );
}
