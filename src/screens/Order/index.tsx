import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Button } from "../../components/Button";
import ButtonBack from "../../components/ButtonBack";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import { PIZZA_TYPES } from "../../Utils/pizzaTypes";
import * as Styled from "./styles";
export default function Order() {
  const [size, setSize] = useState("");
  return (
    <Styled.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Styled.Header>
          <ButtonBack onPress={() => {}} style={{ marginBottom: 108 }} />
        </Styled.Header>

        <Styled.Photo source={{ uri: "http://github.com/ottosouza.png" }} />

        <Styled.Form>
          <Styled.Title>Nome da Pizza</Styled.Title>
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
              <Input keyboardType="numeric" />
            </Styled.InputGroup>
            <Styled.InputGroup>
              <Styled.Label>Quantidade</Styled.Label>
              <Input keyboardType="numeric" />
            </Styled.InputGroup>
          </Styled.FormRow>
          <Styled.Price>Valor de R$ 00,00</Styled.Price>

          <Button title="Confirmar Pedido" />
        </Styled.Form>
      </ScrollView>
    </Styled.Container>
  );
}
