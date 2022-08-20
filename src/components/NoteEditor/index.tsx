/* eslint-disable */
import "codemirror/addon/selection/active-line";
// themes
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neat.css";
import { useMemo, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedNoteSelector } from "recoil/notes.recoil";
import { settingsState } from "recoil/settings.recoil";

import { StyledCodeMirror } from "./styled";

export const NoteEditor = () => {
  // type Editor from codemirror throws an error
  const editor = useRef<any>();
  const wrapper = useRef<any>();
  const selectedNote = useRecoilValue(selectedNoteSelector);
  const setNoteState = useSetRecoilState(selectedNoteSelector);
  const settings = useRecoilValue(settingsState);

  const codeMirrorOptions = useMemo(
    () => ({
      isOpen: false,
      loading: false,
      previewMarkdown: false,
      darkTheme: false,
      sidebarVisible: true,
      mode: "gfm",
      theme: settings.editorTheme,
      lineNumbers: settings.lineNumbers,
      lineWrapping: true,
      styleActiveLine: { nonEmpty: true },
      viewportMargin: Infinity,
      keyMap: "default",
      dragDrop: false,
      scrollPastEnd: false,
    }),
    [settings],
  );

  const editorWillUnmount = () => {
    editor.current?.display.wrapper.remove();
    wrapper.current ? (wrapper.current.hydrated = false) : null;
  };

  return selectedNote ? (
    <StyledCodeMirror
      data-testid="codemirror-editor"
      ref={wrapper}
      className="editor mousetrap"
      value={selectedNote.text}
      options={codeMirrorOptions}
      editorDidMount={(e) => (editor.current = e)}
      editorWillUnmount={editorWillUnmount}
      onBeforeChange={(_, __, value) => {
        setNoteState({
          ...selectedNote,
          text: value,
        });
      }}
      onChange={(editor, _, value) => {
        if (!value || settings.autoFocus) {
          editor.focus();
        }
      }}
      onPaste={(editor, event) => {
        if (!event.clipboardData || !event.clipboardData.items || !event.clipboardData.items[0])
          return;
        event.clipboardData.items[0].getAsString((pasted: string) => {
          if (editor.getSelection() !== pasted) return;
          const { anchor, head } = editor.listSelections()[0];
          editor.setCursor({
            line: Math.max(anchor.line, head.line),
            ch: Math.max(anchor.ch, head.ch),
          });
        });
      }}
    />
  ) : (
    <div />
  );
};
