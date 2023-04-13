import styled from "styled-components";

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  color: ${(props) => props.theme.color.text};

  &:last-of-type {
    border-bottom: none;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }

  .description {
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.lightText};
    margin: 0;
    line-height: 1.3;
  }
`;

const SelectOptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  &:last-of-type {
    border-bottom: none;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }
  .description {
    font-size: 0.9rem;
    color: ${(props) => props.theme.color.lightText};
    margin: 0;
    line-height: 1.3;
  }
`;

const ShortcutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  margin-top: 5px;
  font-size: 0.95rem;
  color: ${(props) => props.theme.color.lightText};

  .keys {
    width: 180px;
  }
`;

export { OptionContainer, SelectOptionContainer, ShortcutContainer };
