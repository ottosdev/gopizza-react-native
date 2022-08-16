import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, ViewProps } from "react-native";
import { Button } from "../../components/Button";
import Input from "../../components/Input";


import {
  Brand,
  Container,
  Content,
  ForgotPasswordButton,
  ForgotPasswordLabel,
  Title,
} from "./styles";
import brandImg from "../../assets/brand.png";
import { useAuth } from "../../context/AuthContext";
export default function SignIn() {
  const { isLoggin, signIn, resetPassword, logout } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSignIn() {
    signIn(email, password)
  }

  function handleResetPassword() {
    resetPassword(email)
  }

  return (
    <Container >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleResetPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

        {isLoggin && <ActivityIndicator size="large" color="red"/>}

          <Button title="Entrar" type="secondary" onPress={handleSignIn} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
