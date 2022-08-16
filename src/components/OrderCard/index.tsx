import { TouchableOpacityProps } from "react-native";
import * as Styled from "./styles";

export type OrderProps = {
  id: string;
  pizza: string;
  image: string;
  status: Styled.StatusTypesProps;
  table_number: string;
  quantity: string;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

export default function OrderCard({ index, data, ...rest }: Props) {
  return (
    <Styled.Container index={index} {...rest}>
      <Styled.Image source={{ uri: data.image }} />
      <Styled.Name>{data.pizza}</Styled.Name>
      <Styled.Description>
        {data.table_number} - Qnt {data.quantity}
      </Styled.Description>

      <Styled.StatusContainer status={data.status}>
        <Styled.StatusLabel status={data.status}>
          {data.status}
        </Styled.StatusLabel>
      </Styled.StatusContainer>
    </Styled.Container>
  );
}
