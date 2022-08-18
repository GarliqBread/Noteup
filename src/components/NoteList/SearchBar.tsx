import { Button } from "components/Button";
import { Input } from "components/Input";

import { SearchContainer } from "./style";

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  deleteTrash: () => void;
  isTrash?: boolean;
};
export const SearchBar = ({ keyword, setKeyword, deleteTrash, isTrash }: Props) => {
  return (
    <SearchContainer>
      <Input placeholder="Search" clear value={keyword} onChange={(value) => setKeyword(value)} />
      {isTrash && (
        <Button title="Empty trash" variant="danger" onClick={deleteTrash}>
          Empty
        </Button>
      )}
    </SearchContainer>
  );
};
