import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, ScrollView } from "react-native";
import {
  OrderNavigationProps,
  ProductNavigationProps,
} from "../../@types/navigation";
import { Button } from "../../components/Button";
import ButtonBack from "../../components/ButtonBack";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import { PIZZA_TYPES } from "../../Utils/pizzaTypes";
import firestore from "@react-native-firebase/firestore";
import * as Styled from "./styles";
import { ProductProps } from "../../components/ProductCard";
import { useAuth } from "../../context/AuthContext";

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number;
  };
};

export default function Order() {
  const { user } = useAuth();
  const [size, setSize] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const { id } = route.params as OrderNavigationProps;
  const amount = size ? pizza.prices_sizes[size] * quantity : "0,00";
  const [sedingOrder, setSegindOrder] = useState(false);

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((res) => {
          setPizza(res.data() as PizzaResponse);
        })
        .catch(() => {
          Alert.alert("Pedido", "Nao foi possivel carregar o produto");
        });
    }
  }, [id]);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o numero da mesa");
    }

    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade");
    }

    setSegindOrder(true);

    firestore()
      .collection("order")
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => navigation.navigate("home"))
      .catch(() => {
        Alert.alert("Pedido", "Nao foi possivel realizar o pedido");
        setSegindOrder(false);
      });
  }

  return (
    <Styled.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Styled.Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </Styled.Header>

        <Styled.Photo source={{ uri: pizza.photo_url }} />

        <Styled.Form>
          <Styled.Title>{pizza.name}</Styled.Title>
          <Styled.Label>Selecione um tamanho</Styled.Label>

          <Styled.Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            ))}
          </Styled.Sizes>

          <Styled.FormRow>
            <Styled.InputGroup>
              <Styled.Label>Numero da mesa</Styled.Label>
              <Input
                keyboardType="numeric"
                value={tableNumber}
                onChangeText={setTableNumber}
              />
            </Styled.InputGroup>
            <Styled.InputGroup>
              <Styled.Label>Quantidade</Styled.Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </Styled.InputGroup>
          </Styled.FormRow>
          <Styled.Price>Valor de R$ {amount}</Styled.Price>

          {sedingOrder && <ActivityIndicator size="large" color="red"/>}   

          <Button title="Confirmar Pedido" onPress={handleOrder}/>
        </Styled.Form>
      </ScrollView>
    </Styled.Container>
  );
}
