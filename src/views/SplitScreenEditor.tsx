import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { MarkdownPreviewRef } from "@uiw/react-markdown-preview";
import { UIEvent, useEffect, useRef } from "react";
import SplitPane from "react-split-pane";

import { Note } from "@/recoil/types";

import { NoteEditor } from "./NoteEditor";
import { NotePreview } from "./NotePreviewer";

type Props = {
  note: Note;
  setNote: (value: Note) => void;
};

export const SplitScreenEditor = ({ note, setNote }: Props) => {
  const active = useRef<"text" | "preview">("text");
  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const previewRef = useRef<MarkdownPreviewRef>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement, UIEvent>) => {
    const textareaDom = editorRef.current?.editor?.children[0].children[1] as HTMLDivElement;
    const previewDom = previewRef.current?.mdp.current;
    if (textareaDom && previewDom) {
      const scale =
        (textareaDom.scrollHeight - textareaDom.offsetHeight) /
        (previewDom.scrollHeight - previewDom.offsetHeight);

      if (e.target === textareaDom && active.current === "text") {
        previewDom.scrollTop = textareaDom.scrollTop / scale;
      }
      if (e.target === previewDom && active.current === "preview") {
        textareaDom.scrollTop = previewDom.scrollTop * scale;
      }
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.mdp?.current?.addEventListener("mouseover", () => {
        active.current = "preview";
      });
      previewRef.current.mdp?.current?.addEventListener("mouseleave", () => {
        active.current = "text";
      });
    }
  }, []);

  return (
    <div>
      <SplitPane split="vertical" size="50%">
        <NoteEditor innerRef={editorRef} note={note} setNote={setNote} onScroll={handleScroll} />
        <NotePreview border innerRef={previewRef} previewNote={note} onScroll={handleScroll} />
      </SplitPane>
    </div>
  );
};
