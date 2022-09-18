import mousetrap from "mousetrap";
import "mousetrap-global-bind";
import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

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
