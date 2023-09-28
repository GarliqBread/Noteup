import { defaultKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ViewPlugin, keymap } from "@codemirror/view";
import { Toolbar } from "@noteup/shared/components/NoteEditor/Toolbar";
import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
  toolbarSelector,
} from "@noteup/shared/recoil/editor.recoil";
import { themeSelector } from "@noteup/shared/recoil/settings.recoil";
import { Note } from "@noteup/shared/recoil/types";
import { customKeymap } from "@noteup/shared/utils/editorKeymaps";
import { editorThemes } from "@noteup/shared/utils/editorThemes";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { RefObject, Suspense, UIEvent, lazy, useMemo } from "react";
import { useRecoilValue } from "recoil";

const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

type Props = {
  editorRef?: RefObject<ReactCodeMirrorRef>;
  note: Note;
  setNote: (value: Note) => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
};

export const NoteEditor = ({ editorRef, note, setNote, onScroll }: Props) => {
  const toolbar = useRecoilValue(toolbarSelector);
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
          view.scrollDOM.addEventListener("scroll", (e) => onScroll(e as any));
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
    <>
      {toolbar && <Toolbar editorRef={editorRef} />}
      <Suspense>
        <CodeMirror
          ref={editorRef}
          className={`code-mirror ${toolbar ? "code-mirror-toolbar" : ""}`}
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
    </>
  );
};
