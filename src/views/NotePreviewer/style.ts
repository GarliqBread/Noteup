import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const Previewer = styled(ReactMarkdown)<{ border?: boolean }>`
position: relative;
overflow-y: auto;
background: ${(props) => props.theme.color.firstLayer};
color: ${(props) => props.theme.color.text};
-webkit-font-smoothing: subpixel-antialiased;
width: 100%;
height: 100%;
padding: 15px;
margin-bottom: 52px;
border-left: ${(props) => props.border && `1px solid ${props.theme.color.border}`};

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
    padding: 1rem;
    tab-size: 2;
    color: #404040;
    margin: 0 0 1.5rem 0;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    line-height: 1.4rem;

    code {
      padding: 0;
      background: transparent;
      line-height: 1.2;
      border-width: 0;
    }
  }

  code {
    padding: 2px 3px;
    border-radius: 0.3rem;
  }

  hr {
    height: 0;
    border: 0;
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
  }

  th,
  td {
    text-align: left;
    padding: 0.5rem;
  }

  ul {
    margin-left: 20px;
  }

  ol > li {
    margin-left: 20px;
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
