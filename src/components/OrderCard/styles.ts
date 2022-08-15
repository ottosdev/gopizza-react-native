import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import theme from "../../theme";

type ContainerProps = {
  index: number;
};
export type StatusTypesProps = "Preparando" | "Pronto" | "Entregue";

type StatusProps = {
  status: StatusTypesProps;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 50%;
  align-items: center;
  padding: 24px;

  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const Image = styled.Image`
  width: 104px;
  height: 104px;
  border-radius: 52px;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-top: 21px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TITLE};
    color: ${props.theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 11px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TEXT};
    color: ${props.theme.COLORS.SECONDARY_400};
  `}
`;

export const StatusContainer = styled.View<StatusProps>`
  padding: 3px 16px;
  border-radius: 12px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.status === "Preparando" &&
    css`
      background-color: ${props.theme.COLORS.ALERT_50};
      border: 1px solid ${props.theme.COLORS.ALERT_900};
    `}

  ${(props) =>
    props.status === "Pronto" &&
    css`
      background-color: ${props.theme.COLORS.SUCCESS_900};
    `}

    ${(props) =>
    props.status === "Entregue" &&
    css`
      background-color: ${props.theme.COLORS.SECONDARY_900};
    `}
`;

export const StatusLabel = styled.Text<StatusProps>`
  font-size: 12px;
  line-height: 20px;
  ${(props) => css`
    font-family: ${props.theme.FONTS.TEXT};
    color: ${props.status === "Preparando"
      ? props.theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `}
`;
