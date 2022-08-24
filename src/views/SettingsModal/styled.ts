import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.overlayColor};
  z-index: 98;
`;

const Modal = styled.div`
  position: relative;
  border-radius: 0.3rem;
  background: ${(props) => props.theme.color.secondLayer};
  box-shadow: ${(props) => props.theme.color.shadow};
  text-align: left;
  width: 850px;
  max-width: 90%;
  user-select: text;
  z-index: 100;

  h2 {
    margin: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 0.5px solid ${(props) => props.theme.color.border};
  color: ${(props) => props.theme.color.text};

  svg {
    color: ${(props) => props.theme.color.text};
  }
`;

export { Wrapper, Overlay, Modal, ModalHeader };
