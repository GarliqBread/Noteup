import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { RefObject } from "react";

import { defaultCommands } from "../commands";
import { Bar, CommandButton } from "./style";

type Props = {
  editorRef?: RefObject<ReactCodeMirrorRef>;
};

export const Toolbar = ({ editorRef }: Props) => {
  return (
    <Bar>
      {defaultCommands.map((command, index) => (
        <CommandButton
          key={index}
          title={command.label}
          aria-label={command.label}
          onClick={() => command.execute(editorRef?.current || null)}
        >
          {command.icon}
        </CommandButton>
      ))}
    </Bar>
  );
};
