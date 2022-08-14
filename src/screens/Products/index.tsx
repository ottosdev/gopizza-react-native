import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import ButtonBack from "../../components/ButtonBack";
import Photo from "../../components/Photo";
import * as Styled from "./styles";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import PriceInput from "../../components/PriceInput";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductNavigationProps } from "../../@types/navigation";
import { ProductProps } from "../../components/ProductCard";

interface ProductsProps {
  onLayout: () => void;
}

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export default function Products({ onLayout }: ProductsProps) {
  const [image, setImage] = useState<string>("");
  const [photoPath, setPhotoPath] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceSizeP, setPriceSizeP] = useState(null);
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((res) => {
          const product = res.data() as PizzaResponse;
          setName(product.name);
          setPhotoPath(product.photo_path);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
        });
    }
  }, []);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = (await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4],
      })) as ImagePicker.ImageInfo;

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza");
    }
    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descricao da pizza");
    }
    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza");
    }
    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza"
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => {
        navigation.navigate("home");
      })
      .catch(() => {
        {
          setIsLoading(false);
          Alert.alert("Cadastro", "Não foi possivel cadastras a pizza");
        }
      });

    setIsLoading(false);
  }

  function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate("home"));
      });
  }

  return (
    <Styled.Container
      onLayout={onLayout}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Styled.Header>
        <ButtonBack onPress={handleGoBack} />
        <Styled.Title>Cadastrar</Styled.Title>

        <TouchableOpacity onPress={handleDelete}>
          {id ? <Styled.DeleteLabel>Deletar</Styled.DeleteLabel> : <View />}
        </TouchableOpacity>
      </Styled.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Styled.Upload>
          <Photo uri={image} />

          {!id && (
            <Styled.PickImageButton
              title="Carregar"
              type="secondary"
              onPress={handlePickerImage}
            />
          )}
        </Styled.Upload>

        <Styled.Form>
          <Styled.InputGroup>
            <Styled.Label>Nome</Styled.Label>
            <Input onChangeText={setName} value={name} />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <Styled.InputGroupHeader>
              <Styled.Label>Descrição</Styled.Label>
              <Styled.MaxCharacter>0 de 60 character</Styled.MaxCharacter>
            </Styled.InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <Styled.Label>Tamanhos e preços</Styled.Label>

            <PriceInput
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <PriceInput
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <PriceInput
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </Styled.InputGroup>

          {isLoading && <ActivityIndicator size="large" color="red" />}

          {!id && <Button title="Cadastrar" onPress={handleAdd} />}
        </Styled.Form>
      </ScrollView>
    </Styled.Container>
  );
}
