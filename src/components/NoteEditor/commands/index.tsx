import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { ReactElement } from "react";

import { bold } from "./bold";
import { code, codeBlock } from "./code";
import { header } from "./header";
import { italic } from "./italic";
import { link } from "./link";
import { olist } from "./olist";
import { quote } from "./quote";
import { strike } from "./strike";
import { todo } from "./todo";
import { ulist } from "./ulist";
import { underline } from "./underline";

export type Command = {
  icon: ReactElement;
  label: string;
  execute: (editor: ReactCodeMirrorRef | null) => void;
};

export const defaultCommands = [
  bold,
  italic,
  header,
  strike,
  underline,
  quote,
  ulist,
  olist,
  todo,
  link,
  code,
  codeBlock,
];
