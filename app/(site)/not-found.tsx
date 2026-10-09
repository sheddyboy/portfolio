import { StatusScreen } from "@/components/StatusScreen";

export default function NotFound() {
  return (
    <StatusScreen code="404" title="Page not found">
      The page you are looking for does not exist or has moved.
    </StatusScreen>
  );
}
