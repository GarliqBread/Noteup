import styled from "styled-components";

export const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizes.label};
  color: ${(props) => props.theme.color.lightText};
`;

export const LargeText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.color.lightText};
`;

export const KBD = styled.kbd`
  background-color: ${(props) => props.theme.color.keyBlock};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.color.insetShadow};
  color: ${(props) => props.theme.color.lightText};
  display: inline-block;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 1.5px;
  padding: 1.5px 8.5px;
`;
