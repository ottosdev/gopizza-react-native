import { css } from "styled-components/native";

import styled from "styled-components/native";

export type TitleProps = {
  color: string;
};

export type NotificationProps = {
  notifications: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 18px;
  ${({ theme, color }) => css`
    color: ${color};
    font-family: ${theme.FONTS.TITLE};
  `}
`;

export const Notification = styled.View<NotificationProps>`
  height: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 0 12px;

  ${({ theme, notifications }) =>
    !notifications &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}

  ${({ theme, notifications }) =>
    notifications &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.COLORS.SHAPE};
    `}
`;

export const Quantity = styled.Text<NotificationProps>`
  font-size: 12px;
  ${({ theme, notifications }) =>
    css`
      color: ${notifications
        ? theme.COLORS.SECONDARY_500
        : theme.COLORS.TITLE};
      font-family: ${theme.FONTS.TEXT};
    `}
`;
