import * as Styled from "./styles";
import happyEmoji from "../../assets/happy.png";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import InputSearch from "../../components/Search";

interface HomeProsp {
  onLayout: () => void;
}

export default function Home({ onLayout }: HomeProsp) {
  const { COLORS } = useTheme();
  return (
    <Styled.Container onLayout={onLayout}>
      <Styled.HomeHeader>
        <Styled.Greeting>
          <Styled.GreetingEmoji source={happyEmoji} />
          <Styled.GreetingText>Olá, Admin</Styled.GreetingText>
        </Styled.Greeting>
        <BorderlessButton>
          <MaterialIcons name="logout" size={24} color={COLORS.TITLE} />
        </BorderlessButton>
      </Styled.HomeHeader>
      <InputSearch onSearch={() => {}} onClear={() => {}}/>
      <Styled.MenuHeader>
        <Styled.Title>Cardapio</Styled.Title>
        <Styled.MenuItemsNumber>10 pizzas</Styled.MenuItemsNumber>
      </Styled.MenuHeader>
    </Styled.Container>
  );
}
