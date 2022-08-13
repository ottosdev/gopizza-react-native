import * as Styled from "./styles";

type PhotoProps = {
  uri: string | null;
};

export default function Photo({ uri }: PhotoProps) {
  if (uri) {
    return <Styled.Image source={{ uri }} />;
  }

  return (
    <Styled.Placeholder>
      <Styled.PlaceholderTitle>
        Nenhuma foto{`\n`}carregada
      </Styled.PlaceholderTitle>
    </Styled.Placeholder>
  );
}
