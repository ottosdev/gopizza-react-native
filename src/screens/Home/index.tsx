import * as Styled from "./styles";
import happyEmoji from "../../assets/happy.png";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import InputSearch from "../../components/Search";
import ProductCard, { ProductProps } from "../../components/ProductCard";
import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
interface HomeProsp {
  onLayout: () => void;
}

export default function Home({ onLayout }: HomeProsp) {
  const { COLORS } = useTheme();
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  async function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();
    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((res) => {
        const data = res.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setPizzas(data);
      })
      .catch(() => {
        Alert.alert("Buscar", "Nao foi possivel fazer a busca");
      });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  function handleOpen(id: string) {
    navigation.navigate("product", { id });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  return (
    <Styled.Container onLayout={onLayout}>
      <Styled.HomeHeader>
        <Styled.Greeting>
          <Styled.GreetingEmoji source={happyEmoji} />
          <Styled.GreetingText>Olá, Thaynara</Styled.GreetingText>
        </Styled.Greeting>
        <BorderlessButton>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </BorderlessButton>
      </Styled.HomeHeader>
      <InputSearch
        onChangeText={setSearch}
        value={search}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />
      <Styled.MenuHeader>
        <Styled.Title>Cardapio</Styled.Title>
        <Styled.MenuItemsNumber>{pizzas.length} pizzas</Styled.MenuItemsNumber>
      </Styled.MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
      />

      <Styled.NewProductButton
        title="Cadastrar pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </Styled.Container>
  );
}
