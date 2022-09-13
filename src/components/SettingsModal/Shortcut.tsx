import { ShortcutContainer } from "./style";

type Props = {
  action: string;
  letter: string;
};

export const Shortcut = ({ action, letter }: Props) => {
  return (
    <ShortcutContainer>
      <div>{action}</div>
      <div className="keys">
        <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>{letter}</kbd>
      </div>
    </ShortcutContainer>
  );
};
