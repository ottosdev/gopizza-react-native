import { TextInputProps } from "react-native";
import * as Styled from "./styles";

type Props = TextInputProps & {
  size: string;
};

export default function PriceInput({ size, ...rest }: Props) {
  return (
    <Styled.Container>
      <Styled.Size>
        <Styled.Label>{size}</Styled.Label>
      </Styled.Size>

      <Styled.Label>R$</Styled.Label>
      <Styled.InputNumeric keyboardType="numeric" {...rest}/>
    </Styled.Container>
  );
}
