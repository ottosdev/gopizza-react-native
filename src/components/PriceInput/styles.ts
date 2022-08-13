import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
export type TypeProps = "primary" | "secondary";

type Props = {
  type: TypeProps;
};

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border: 1px solid ${(props) => props.theme.COLORS.SHAPE};
  border-radius: 12px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Size = styled.View`
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-right-color: ${(props) => props.theme.COLORS.SHAPE};
  margin-right: 18px;
`;

export const Label = styled.Text`
  font-size: 14px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TEXT};
    color: ${props.theme.COLORS.SECONDARY_900};
  `}
`;

export const InputNumeric = styled(TextInput)`
  flex: 1;
  margin-left: 8px;
`;

// export const Container = styled(TextInput).attrs<Props>(({ theme, type }) => ({
//   placeholderTextColor:
//     type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
// }))<Props>`
//   width: 100%;
//   height: 56px;
//   background-color: transparent;
//   border-radius: 12px;
//   font-size: 14px;
//   padding: 7px 0;
//   padding-left: 20px;
//   margin-bottom: 16px;

//   ${({ theme, type }) => css`
//     font-family: ${theme.FONTS.TEXT};
//     border: 1px solid ${theme.COLORS.SHAPE};
//     color: ${type === "primary"
//       ? theme.COLORS.SECONDARY_900
//       : theme.COLORS.TITLE};
//   `}
// `;
