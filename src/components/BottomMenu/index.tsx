import * as Styled from "./styles";

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined;
};

export default function BottomMenu({ title, color, notifications }: Props) {
  const noNotifications = notifications === "0";
  return (
    <Styled.Container>
      <Styled.Title color={color}>{title}</Styled.Title>

      {notifications && (
        <Styled.Notification notifications={noNotifications}>
          <Styled.Quantity notifications={noNotifications}>
            {" "}
            {notifications}
          </Styled.Quantity>
        </Styled.Notification>
      )}
    </Styled.Container>
  );
}
