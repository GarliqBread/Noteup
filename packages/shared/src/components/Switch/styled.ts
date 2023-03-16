import styled from "styled-components";

const Label = styled.label`
  position: relative;
  display: inline-block;
  min-width: 45px;
  width: 45px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background: ${(props) => props.theme.color.green};
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #72ce6e;
    }

    &:checked + .slider:before {
      transform: translateX(21px);
    }
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.color.slider};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background: white;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.color.shadower};
  }
`;

export { Label, Slider };
