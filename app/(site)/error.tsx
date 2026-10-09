"use client";

import { useEffect } from "react";
import { StatusScreen } from "@/components/StatusScreen";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen code="500" title="Something went wrong" onRetry={() => retry()}>
      An unexpected error occurred. You can try again or head back home.
    </StatusScreen>
  );
}
