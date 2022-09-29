import { defaultKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ViewPlugin, keymap } from "@codemirror/view";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { Ref, Suspense, lazy, useMemo } from "react";
import { useRecoilValue } from "recoil";

import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
} from "@/recoil/editor.recoil";
import { themeSelector } from "@/recoil/settings.recoil";
import { Note } from "@/recoil/types";

import { customKeymap } from "@/utils/editorKeymaps";
import { editorThemes } from "@/utils/editorThemes";

const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

type Props = {
  innerRef?: Ref<ReactCodeMirrorRef>;
  note: Note;
  setNote: (value: Note) => void;
  onScroll?: (e: Event) => void;
};

export const NoteEditor = ({ innerRef, note, setNote, onScroll }: Props) => {
  const breakLines = useRecoilValue(breakLinesSelector);
  const foldGutter = useRecoilValue(foldGutterSelector);
  const lineNumbers = useRecoilValue(lineNumbersSelector);
  const autoComplete = useRecoilValue(autoCompleteSelector);
  const theme = useRecoilValue(themeSelector);
  const editorTheme = useRecoilValue(editorThemeSelector);

  const codeMirrorOptions = useMemo(
    () => ({
      lineNumbers: lineNumbers,
      history: true,
      foldGutter: foldGutter,
      allowMultipleSelections: true,
      autocompletion: autoComplete,
    }),
    [lineNumbers, foldGutter, autoComplete],
  );
  const scroll = ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        if (onScroll) {
          view.scrollDOM.addEventListener("scroll", onScroll);
        }
      }
    },
  );
  const extensions = useMemo(() => {
    const defaultExtensions = [
      scroll,
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      keymap.of([...defaultKeymap, ...customKeymap]),
    ];

    return breakLines ? [EditorView.lineWrapping, ...defaultExtensions] : defaultExtensions;
  }, [scroll, breakLines]);

  return (
    <Suspense>
      <CodeMirror
        ref={innerRef}
        className="code-mirror"
        value={note.text}
        height="100%"
        onChange={(value) => {
          setNote({
            ...note,
            text: value,
          });
        }}
        autoFocus
        indentWithTab
        extensions={extensions}
        theme={editorThemes[theme][editorTheme]}
        basicSetup={codeMirrorOptions}
      />
    </Suspense>
  );
};
