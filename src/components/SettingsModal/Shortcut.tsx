import { useDeviceOS } from "@/utils/hooks/useDeviceOS";

import { KBD } from "@/styles/typography";

import { ShortcutContainer } from "./style";

type Props = {
  action: string;
  letter: string;
};

export const Shortcut = ({ action, letter }: Props) => {
  const { altKey, ctrlKey } = useDeviceOS();

  return (
    <ShortcutContainer>
      <div>{action}</div>
      <div className="keys">
        <KBD>{ctrlKey}</KBD> <KBD>{altKey}</KBD> <KBD>{letter}</KBD>
      </div>
    </ShortcutContainer>
  );
};
