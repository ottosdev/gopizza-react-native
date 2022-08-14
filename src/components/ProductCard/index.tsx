import * as Styled from "./styles";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = TouchableOpacityProps & {
  data: ProductProps;
};

export default function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Styled.Container>
      <Styled.Content {...rest}>
        <Styled.Image source={{ uri: data.photo_url }} />

        <Styled.Detais>
          <Styled.Identification>
            <Styled.Name>{data.name}</Styled.Name>
            <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Styled.Identification>
          <Styled.Description>{data.description}</Styled.Description>
        </Styled.Detais>
      </Styled.Content>
      <Styled.Line />
    </Styled.Container>
  );
}
