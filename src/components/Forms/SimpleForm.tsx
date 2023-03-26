import { FormEvent, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { Input } from "@/components/Input";

import styled from "styled-components";


const FormStyle = styled.form`
  display: flex;
  border-radius: 0.3rem;
  padding: 0.75rem;
  outline: none;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 100%;

  &:focus {
    outline: 0;
    border: 1px solid lighten(${(props) => props.theme.color.primary}, 15%);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

type Props = {
  closeForm: () => void;
  recoilStateMethod: RecoilState<any>
};

export const SimpleForm = ({ closeForm, recoilStateMethod }: Props) => {
  const [tempName, setTempName] = useState("");
  const [items, setItems] = useRecoilState(recoilStateMethod);

  const resetForm = () => {
    setTempName("");
    closeForm();
  };

  const createItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        name: tempName,
        id: uuid(),
      },
    ]);
    resetForm();
  };

  return (
    <FormStyle onSubmit={createItem}>
      <Input
        aria-label="Title"
        autoFocus
        maxLength={20}
        placeholder="what is new?"
        value={tempName}
        onChange={setTempName}
        onBlur={resetForm}
      />
    </FormStyle>
  );
};
