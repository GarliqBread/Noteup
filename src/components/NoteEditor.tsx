import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "codemirror";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { settingsState } from "recoil/settings.recoil";
import { Note } from "recoil/types";

import { editorThemes } from "utils/editorThemes";

type Props = {
  note: Note;
  setNote: (value: Note) => void;
};

export const NoteEditor = ({ note, setNote }: Props) => {
  const settings = useRecoilValue(settingsState);
  const codeMirrorOptions = useMemo(
    () => ({
      lineNumbers: settings.lineNumbers,
      history: true,
      foldGutter: settings.foldGutter,
      allowMultipleSelections: true,
      indentOnInput: settings.indentOnInput,
      autocompletion: settings.autoComplete,
    }),
    [settings],
  );

  const extensions = useMemo(() => {
    const defaultExtensions = [markdown({ base: markdownLanguage, codeLanguages: languages })];

    return settings.breakLines
      ? [EditorView.lineWrapping, ...defaultExtensions]
      : defaultExtensions;
  }, [settings]);

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
      theme={editorThemes[settings.theme][settings.editorTheme]}
      basicSetup={codeMirrorOptions}
    />
  );
};
