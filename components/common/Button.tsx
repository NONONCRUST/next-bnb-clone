import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 17px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  ${({ color }) => getButtonColor(color || "")}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "dark_cyan";
}

const Button: React.FC<Props> = ({ children, color, ...props }) => {
  return (
    <Container {...props} color={color}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
