import { FlatList } from "react-native";
import ItemSeparator from "../../components/ItemSeparator";
import OrderCard from "../../components/OrderCard";
import * as Styled from "./styles";
export default function Orders() {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>Pedidos Feitos</Styled.Title>
      </Styled.Header>

      <FlatList
        data={["1", "2", "3"]}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Styled.Container>
  );
}
