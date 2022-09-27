import MarkdownPreview from "@uiw/react-markdown-preview";
import styled from "styled-components";

const Previewer = styled(MarkdownPreview)<{ border?: boolean }>`
position: relative;
overflow-y: auto;
background: ${(props) => props.theme.color.firstLayer};
color: ${(props) => props.theme.color.text};
-webkit-font-smoothing: subpixel-antialiased;
width: 100%;
height: ${({ theme }) => `calc(100% - ${theme.spaces.desktopEditor})`};
padding: 15px;
border-left: ${(props) => props.border && `1px solid ${props.theme.color.border}`};

@media (max-width: 500px) {
  height: ${({ theme }) => `calc(100% - ${theme.spaces.mobileEditor})`};
}

a {
  color: ${(props) => props.theme.color.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

  p,
  ol,
  ul,
  dl,
  table {
    font-size: 1.1rem;
    line-height: 1.7;
    margin: 0 0 1.5rem 0;
  }

  ul li ul {
    margin-bottom: 0;
  }

  ol li ol {
    margin-bottom: 0;
  }

  ul li [type='checkbox'] {
    margin-right: 0.75rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0 0 1.5rem 0;
    font-weight: 600;
    line-height: 1.2;

    &:not(:first-child) {
      margin: 1.5rem 0;
    }
  }

  h1:not(:first-child),
  h2:not(:first-child),
  h3:not(:first-child) {
    margin-top: 2rem;
  }

  h1 {
    margin-top: 0.5rem;
    font-size: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    font-size: 1rem;
  }

  blockquote {
    margin: 0 0 1.5rem 0;
    padding: 0.5rem 1.5rem;

    p {
      font-size: 1.1rem;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    cite {
      display: block;
      margin-top: 1.5rem;
      font-size: 1rem;
      text-align: right;
    }
  }

  pre {
    margin-bottom: 16px;
    tab-size: 2;
    color: #404040;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    font-size: 0.9rem;
    line-height: 1.4rem;
    border: none;

    code {
      padding: 10px;
      background: ${({ theme }) => theme.color.lightGray};
      line-height: 1.2;
      border: none;
    }
  }

  code {
    padding: 2px 3px;
    border-radius: 0.3rem;
  }

  hr {
    border: 0.5px solid ${(props) => props.theme.color.border};
  }

  img {
    max-width: 100%;
    max-height: 20rem;
    object-fit: cover;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    max-width: 100%;
    border: 1px solid ${(props) => props.theme.color.lightText};
  }

  th,
  td {
    text-align: left;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.lightText};
  }

  ul {
    margin-left: 20px;
  }

  ol > li {
    margin-left: 20px;
  }

  ul.contains-task-list {
    list-style-type: none;

    input { 
      position: relative;
      display: inline-block;
      width: 17px;
      height: 17px;
      background-color: ${(props) => props.theme.color.input};
      border-radius:${(props) => props.theme.radius.xsmall};
      transition: all 150ms;
      box-shadow: ${(props) => props.theme.color.shadow};
      border: 0.5px solid ${(props) => props.theme.color.border};

      &:checked {
        background-color: ${(props) => props.theme.color.primary};

        &::before {
          content: '\\2713';
          font-size: 14px;
          display: block;
          color: ${(props) => props.theme.color.white};
          position: absolute;
          left: 3px;
          top: -3px;
        }
      }
    }
  }
}

.preview-button {
  display: flex;
  align-items: center;
  top: 0;
  right: 1rem;
  border: none;
  font-weight: 500;
  padding: 0.5rem;
  font-size: 0.8rem;
  z-index: 2;

  &:hover,
  &:focus {
    border: none;
  }

  .invalid-note-uuid {
    color: green;
  }
`;

export { Previewer };
