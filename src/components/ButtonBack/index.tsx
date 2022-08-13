import * as Styled from "./styles"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useTheme } from "styled-components/native"
import { TouchableOpacityProps } from "react-native"

export default function ButtonBack() {
  const {COLORS} = useTheme()

  return (
    <Styled.Container>
      <MaterialIcons  name="chevron-left" size={18} color={COLORS.TITLE}/>
    </Styled.Container>
  )
}
