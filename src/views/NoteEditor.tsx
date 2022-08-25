import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
} from "recoil/editor.recoil";
import { themeSelector } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { editorThemes } from "utils/editorThemes";

type Props = {
  note: Note;
  setNote: (value: Note) => void;
};

export const NoteEditor = ({ note, setNote }: Props) => {
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

  const extensions = useMemo(() => {
    const defaultExtensions = [markdown({ base: markdownLanguage, codeLanguages: languages })];

    return breakLines ? [EditorView.lineWrapping, ...defaultExtensions] : defaultExtensions;
  }, [breakLines]);

  return (
    <CodeMirror
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
  );
};
