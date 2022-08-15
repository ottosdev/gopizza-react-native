import { TouchableOpacityProps } from "react-native";
import * as Styled from "./styles";

type Props = TouchableOpacityProps &
  Styled.RadioButtonProps & {
    title: string;
  };

export default function RadioButton({
  title,
  selected = false,
  ...rest
}: Props) {
  return (
    <Styled.Container selected={selected} {...rest}>
      <Styled.Radio>{selected && <Styled.Selected />}</Styled.Radio>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  );
}
