import styled from "styled-components";

import { lightTheme } from "./theme/colors";

type FlexProps = {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: number;
  bg?: keyof typeof lightTheme;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Flex = styled.div<FlexProps>`
  position: relative;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  display: flex;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || 0}px;
`;

const FlexColumn = styled(Flex) <FlexProps>`
  flex-direction: column;
  align-items: ${(props) => props.alignItems || "flex-start"};
  background-color: ${(props) => props.bg && props.theme.color[props.bg]};
`;

const Ellipsis = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  max-width: 85%;
`;

const EllipsisParagraph = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
`;

export { Container, Flex, FlexColumn, Ellipsis, EllipsisParagraph };
