import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { useEffect, useRef } from "react";
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
  const previewRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: Event) => {
    const editorDom = editorRef.current?.editor?.children[0].children[1] as HTMLDivElement;
    const previewDom = previewRef.current;

    if (editorDom && previewDom) {
      const scale =
        (editorDom.scrollHeight - editorDom.offsetHeight) /
        (previewDom.scrollHeight - previewDom.offsetHeight);

      if (e.target === editorDom && active.current === "text") {
        previewDom.scrollTop = editorDom.scrollTop / scale;
      }
      if (e.target === previewDom && active.current === "preview") {
        editorDom.scrollTop = previewDom.scrollTop * scale;
      }
    }
  };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current?.addEventListener("mouseover", () => {
        active.current = "preview";
      });
      previewRef.current?.addEventListener("mouseleave", () => {
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
