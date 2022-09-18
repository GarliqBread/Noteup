import { useMemo } from "react";

export const useDeviceOS = () => {
  const platform = useMemo(() => window.navigator.platform, []);
  const isMacOS = useMemo(() => platform.toLowerCase().startsWith("mac"), [platform]);

  return {
    platform,
    isMacOS,
    altKey: isMacOS ? "⌥" : "ALT",
    ctrlKey: isMacOS ? "⌃" : "CTRL",
  };
};
