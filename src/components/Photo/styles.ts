import styled, { css } from "styled-components/native";

export const Image = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const Placeholder = styled.View`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${(props) => props.theme.COLORS.SECONDARY_400};
`;

export const PlaceholderTitle = styled.Text`
  font-size: 14px;
  text-align: center;
  ${(props) => css`
    color: ${props.theme.COLORS.SECONDARY_400};
    font-family: ${props.theme.FONTS.TEXT};
  `}
`;
