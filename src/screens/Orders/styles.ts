import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { css } from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 0 33px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TITLE};
    color: ${props.theme.COLORS.TITLE};
  `}
`;
