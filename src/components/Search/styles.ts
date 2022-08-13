import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
export type TypeProps = "primary" | "secondary";

type Props = {
  type: TypeProps;
};

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: -30px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;

  ${(props) => css`
    background-color: ${props.theme.COLORS.TITLE};
    border: 1px solid ${props.theme.COLORS.SHAPE};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 52px;
  padding-left: 12px;
  font-family: ${(props) => props.theme.FONTS.TEXT};
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 7px;
`;

export const Button = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.COLORS.SUCCESS_900};
  border-radius: 18px;
  margin-left: 7px;
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
