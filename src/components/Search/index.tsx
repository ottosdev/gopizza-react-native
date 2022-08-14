import { TextInputProps, TouchableOpacityProps } from "react-native";
import * as Styled from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export default function InputSearch({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Styled.Container>
      <Styled.InputArea>
        <Styled.Input placeholder="pesquisar..." {...rest} />

        <Styled.ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </Styled.ButtonClear>
      </Styled.InputArea>
      <Styled.Button onPress={onSearch}>
        <Feather name="search" size={16} color={COLORS.TITLE} />
      </Styled.Button>
    </Styled.Container>
  );
}
