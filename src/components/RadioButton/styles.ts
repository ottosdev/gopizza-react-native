import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type RadioButtonProps = {
  selected: boolean;
};

export const Container = styled(TouchableOpacity)<RadioButtonProps>`
  width: 104px;
  height: 82px;
  border-radius: 8px;
  padding: 14px 16px;

  ${(props) => css`
    border: 1px solid
      ${props.selected
        ? props.theme.COLORS.SUCCESS_900
        : props.theme.COLORS.SHAPE};
    background-color: ${props.selected
      ? props.theme.COLORS.SUCCESS_50
      : props.theme.COLORS.TITLE};
  `}
`;

export const Title = styled.Text`
  font-size: 16px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TITLE};
    color: ${props.theme.COLORS.SECONDARY_900};
  `}
`;

export const Radio = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.COLORS.SECONDARY_900};
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`;

export const Selected = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color:${(props) => props.theme.COLORS.SUCCESS_900};
`;


