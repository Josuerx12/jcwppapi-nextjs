// hooks/useInstanceSSE.ts
import { useEffect } from "react";

export function useInstanceSSE(sessionId: string, onConnected: () => void) {
  useEffect(() => {
    if (!sessionId) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_JCWPPAPI_URL}/sse/instance/${sessionId}/status`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("SSE received:", data);
      onConnected();
    };

    return () => {
      eventSource.close();
    };
  }, [sessionId, onConnected]);
}
