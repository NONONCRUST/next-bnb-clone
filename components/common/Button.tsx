import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    case "white":
      return css`
        background-color: white;
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

const normalButtonStyle = css`
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

const registerButtonStyle = css`
  width: 161px;
  height: 45px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const Container = styled.button<{ styleType: "normal" | "register" }>`
  ${({ styleType }) =>
    styleType === "register" ? registerButtonStyle : normalButtonStyle}

  ${({ color }) => getButtonColor(color || "")}
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "dark_cyan" | "white";
  styleType?: "normal" | "register";
}

const Button: React.FC<Props> = ({
  children,
  color,
  styleType = "normal",
  ...props
}) => {
  return (
    <Container {...props} color={color} styleType={styleType}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
