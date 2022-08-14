import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
  margin-right: 20px;
`;

export const Detais = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 20px;

  ${(props) => css`
    font-family: ${props.theme.FONTS.TITLE};
    color: ${props.theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  font-size: 12px;
  line-height: 20px;
  margin-right: 21px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TEXT};
    color: ${props.theme.COLORS.SECONDARY_400};
  `}
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 124px;
  background-color: ${(props) => props.theme.COLORS.SHAPE};
`;

export const Identification = styled.View`
  flex-direction: row;
  align-items: center;
`;
