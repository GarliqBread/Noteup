import { useRecoilState } from "recoil";

import { categoriesSelector } from "@/recoil/categories.recoil";
import { notesSelector } from "@/recoil/notes.recoil";
import { Category, Note } from "@/recoil/types";

import { LabelText } from "@/utils/enums";
import { backupNotes } from "@/utils/exports";

import { Button, UploadButton } from "@/components/Button";
import { CloudDownload, CloudUpload } from "@/components/Icons";

type Props = {
  closeModal: () => void;
};

export const DataManagementPanel = ({ closeModal }: Props) => {
  const [notes, setNotes] = useRecoilState(notesSelector);
  const [categories, setCategories] = useRecoilState(categoriesSelector);

  const importBackup = async (json: File) => {
    const content = await json.text();
    const { notes, categories } = JSON.parse(content) as {
      notes: Note[];
      categories: Category[];
    };

    if (!notes || !categories) return;

    setNotes(notes);
    setCategories(categories);
    closeModal();
  };

  return (
    <>
      <p>Export Noteup data as JSON.</p>
      <Button
        className="download-button"
        variant="primary"
        title="Export backup"
        onClick={() => backupNotes(notes, categories)}
      >
        <CloudDownload size={18} /> {LabelText.BACKUP_ALL_NOTES}
      </Button>
      <p>Import Noteup JSON file.</p>
      <UploadButton
        className="download-button"
        variant="primary"
        title="Import backup"
        onUpload={importBackup}
      >
        <CloudUpload size={18} /> {LabelText.IMPORT_BACKUP}
      </UploadButton>
    </>
  );
};
