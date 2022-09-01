import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import { selectedCategoryIdSelector } from "recoil/categories.recoil";
import { activeFolderSelector } from "recoil/folder.recoil";
import { keywordSelector, notesSelector, notesState } from "recoil/notes.recoil";

import { Folder } from "utils/enums";
import { useWindowDimensions } from "utils/hooks/useWindowDimensions";

import { Button } from "components/Button";
import { Plus } from "components/Icons";
import { Input } from "components/Input";

import { SearchContainer } from "./style";

type Props = {
  isListEmpty: boolean;
};

export const SearchBar = ({ isListEmpty }: Props) => {
  const isSmallDevice = useWindowDimensions();
  const [notes, setNotes] = useRecoilState(notesSelector);
  const [noteState, setNoteState] = useRecoilState(notesState);
  const [keyword, setKeyword] = useRecoilState(keywordSelector);
  const activeFolder = useRecoilValue(activeFolderSelector);
  const selectedCategoryId = useRecoilValue(selectedCategoryIdSelector);
  const isTrash = activeFolder === Folder.TRASH;

  const addNewNote = () =>
    setNotes([
      {
        id: uuid(),
        text: '# Welcome to Noteup!\n\nNoteup is a free, open-source notes app for the web and desktop. Your notes are saved in local storage and will not be permanently persisted, but are available for download.\n\nView the source on [Github](https://github.com/taniarascia/takenote).\n\n## Features\n\n- **Plain text notes** - take notes in an IDE-like environment that makes no assumptions\n- **Markdown preview** - view rendered HTML\n- **Linked notes** - use `{{uuid}}` syntax to link to notes within other notes\n- **Syntax highlighting** -\n\nSeveral theme options available through the settings menu.\n\n- **Keyboard shortcuts** - use the keyboard for all common tasks - creating notes and categories, toggling settings, and other options\n- **Multi-cursor editing** - supports multiple cursors and other [Codemirror](https://codemirror.net/) options\n- **Search notes** - easily search all notes, or notes within a category\n- **No WYSIWYG** - made for developers, by developers\n- **No database** - notes are only stored in the browser\'s local storage and are available for download and export to you alone\n- **No tracking or analytics**\n- **GitHub integration** - self-hosted option is available for auto-syncing to a GitHub repository (not available in the demo)\n\nEasily insert your code blocks into your notes\n\n```js\n// js\nconst text = "This is a string";\n\nconst isTextANumber = !!isNan(text);\n```\n\n```python\n# python\nlet test = "test";\n```\n\n\n',
        created: dayjs().format(),
        lastUpdated: dayjs().format(),
        categoryId: selectedCategoryId || undefined,
        pinned: activeFolder === Folder.PINNED,
      },
    ]);

  useEffect(() => () => setKeyword(""), [setKeyword]);

  return (
    <SearchContainer>
      <Input placeholder="Search" clear value={keyword} onChange={setKeyword} />
      {isTrash ? (
        <Button
          disabled={isListEmpty}
          title="Empty trash"
          variant="danger"
          onClick={() =>
            setNoteState({
              ...noteState,
              notes: notes.filter((note) => !note.trash),
            })
          }
        >
          Empty
        </Button>
      ) : (
        <Button title="Add new note" variant="primary" onClick={addNewNote}>
          <Plus size={15} />
        </Button>
      )}
    </SearchContainer>
  );
};
