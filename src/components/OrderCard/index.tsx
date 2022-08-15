import { TouchableOpacityProps } from "react-native";
import * as Styled from "./styles";

type Props = TouchableOpacityProps & {
  index: number;
};

export default function OrderCard({ index, ...rest }: Props) {
  return (
    <Styled.Container index={index} {...rest}>
      <Styled.Image source={{ uri: "http://github.com/ottosouza.png" }} />
      <Styled.Name>4 Queijos</Styled.Name>
      <Styled.Description>Mesa 5 : Qnt 1</Styled.Description>

      <Styled.StatusContainer status="Preparando">
        <Styled.StatusLabel status="Preparando">Preparando</Styled.StatusLabel>
      </Styled.StatusContainer>
    </Styled.Container>
  );
}
