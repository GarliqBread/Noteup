import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay = 2000, shouldRun = true) => {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!shouldRun) return;
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current || undefined);
    }
  }, [delay, shouldRun]);

  return intervalRef;
};
