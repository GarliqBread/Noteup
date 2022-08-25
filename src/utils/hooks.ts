import mousetrap from "mousetrap";
import "mousetrap-global-bind";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

export const useKey = (key: string, action: () => void) => {
  const actionRef = useRef(noop);
  actionRef.current = action;

  useEffect(() => {
    mousetrap.bind(key, (event: Event) => {
      event.preventDefault();
      if (actionRef.current) {
        actionRef.current();
      }
    });

    return () => {
      mousetrap.unbind(key);
    };
  }, [key]);
};
