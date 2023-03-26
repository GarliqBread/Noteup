import { useRecoilState } from "recoil";

import {
  autoCompleteSelector,
  breakLinesSelector,
  editorThemeSelector,
  foldGutterSelector,
  lineNumbersSelector,
  previewerThemeSelector,
  renderHTMLSelector,
  toolbarSelector,
} from "@/recoil/editor.recoil";
import { sortKeySelector, themeSelector } from "@/recoil/settings.recoil";

import { notesSortOptions, themeEditorOptions, themePreviewOptions } from "@/utils/constants";
import { EditorThemeKey, NotesSortKey, PreviewThemeKey } from "@/utils/enums";

import { Option } from "@/components/SettingsModal/Option";
import { SelectOptions } from "@/components/SettingsModal/SelectOption";

export const PreferencesPanel = () => {
  const [theme, setTheme] = useRecoilState(themeSelector);
  const [sortKey, setSortKey] = useRecoilState(sortKeySelector);
  const [autoComplete, setAutoComplete] = useRecoilState(autoCompleteSelector);
  const [toolbar, setToolbar] = useRecoilState(toolbarSelector);
  const [lineNumbers, setLineNumbers] = useRecoilState(lineNumbersSelector);
  const [breakLines, setBreakLines] = useRecoilState(breakLinesSelector);
  const [foldGutter, setFoldGutter] = useRecoilState(foldGutterSelector);
  const [editorTheme, setEditorTheme] = useRecoilState(editorThemeSelector);
  const [previewerTheme, setPreviewerTheme] = useRecoilState(previewerThemeSelector);
  const [renderHTML, setRenderHTML] = useRecoilState(renderHTMLSelector);

  const toggleToolbar = () => setToolbar(!toolbar);
  const toggleLineNumbers = () => setLineNumbers(!lineNumbers);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleAutoComplete = () => setAutoComplete(!autoComplete);
  const toggleBreakLines = () => setBreakLines(!breakLines);
  const toggleFoldGutter = () => setFoldGutter(!foldGutter);
  const toggleRenderHTML = () => setRenderHTML(!renderHTML);

  return (
    <>
      <Option
        title="Editor toolbar"
        description="Editor's shortcut toolbar"
        toggle={toggleToolbar}
        checked={toolbar}
      />
      <Option
        title="Display line numbers"
        description="Editor's line numbers"
        toggle={toggleLineNumbers}
        checked={lineNumbers}
      />
      <Option
        title="Auto-complete"
        description="Editor's auto-complete"
        toggle={toggleAutoComplete}
        checked={autoComplete}
      />
      <Option
        title="Break lines"
        description="Break lines on the editor"
        toggle={toggleBreakLines}
        checked={breakLines}
      />
      <Option
        title="Fold gutter"
        description="Fold gutters on the editor"
        toggle={toggleFoldGutter}
        checked={foldGutter}
      />
      <Option
        title="Render HTML"
        description="Renders HTML in the previewer"
        toggle={toggleRenderHTML}
        checked={renderHTML}
      />
      <Option
        title="Dark mode"
        description="Application's theme"
        toggle={toggleTheme}
        checked={theme === "dark"}
      />
      <SelectOptions
        title="Sort By"
        description="Notes list sorting strategy"
        onChange={(key) => setSortKey(key as NotesSortKey)}
        options={notesSortOptions}
        value={sortKey}
      />
      <SelectOptions
        title="Editor theme"
        description="Markdown editor's theme"
        onChange={(key) => setEditorTheme(key as EditorThemeKey)}
        options={themeEditorOptions}
        value={editorTheme}
      />
      <SelectOptions
        title="Previewer theme"
        description="Markdown preview's theme"
        onChange={(key) => setPreviewerTheme(key as PreviewThemeKey)}
        options={themePreviewOptions}
        value={previewerTheme}
      />
    </>
  );
};
