import { Alert, FlatList } from "react-native";
import ItemSeparator from "../../components/ItemSeparator";
import OrderCard, { OrderProps } from "../../components/OrderCard";
import * as Styled from "./styles";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { StatusTypesProps } from "../../components/OrderCard/styles";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrder] = useState<OrderProps[]>([]);

  function handlePizzaDelivred(id: string) {
    Alert.alert("Pedido", "Confirmar que a pizza foi entregue a mesa?", [
      {
        text: "Nao",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("order").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection("order")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrder(data);
      });

    return () => subscribe();
  }, []);
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>Pedidos Feitos</Styled.Title>
      </Styled.Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === "Entregue"}
            onPress={() => handlePizzaDelivred(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Styled.Container>
  );
}
