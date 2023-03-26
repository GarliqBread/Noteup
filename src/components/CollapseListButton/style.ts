import styled from "styled-components";

const CollapseButton = styled.button`
  cursor: pointer;
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  padding: 0;
  background: transparent;
  font-size: 0.8rem;
  border: none;
  line-height: 1;
  margin: 0;
  opacity: 0.8;

  &:hover {
    color: white;

    svg {
      stroke: white;
    }
  }

  label {
    padding-left: 10px;
    color: #d0d0d0;
  }
`;


export {CollapseButton};
