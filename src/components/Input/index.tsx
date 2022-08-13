import { TextInputProps } from "react-native";
import React from "react";
import { Container, TypeProps } from "./styles";

type Props = TextInputProps & {
  type?: TypeProps;
};

export default function Input({ type = "primary", ...rest }: Props) {
  return <Container type={type} {...rest} />;
}
