// hooks/useInstanceSSE.ts
import { useEffect } from "react";

export function useInstanceSSE(instanceId: string, onConnected: () => void) {
  useEffect(() => {
    if (!instanceId) return;

    const eventSource = new EventSource(
      `https://jcwppapi.jcdev.com.br/api/sse/instance/${instanceId}/status`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("SSE received:", data);
      onConnected();
    };

    return () => {
      eventSource.close();
    };
  }, [instanceId, onConnected]);
}
