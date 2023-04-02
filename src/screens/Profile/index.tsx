import { View, Text, TextInput, Button } from 'react-native'

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput placeholder="Nome" autoCorrect={false} />

      <TextInput placeholder="E-mail" autoCorrect={false} />

      <Button title='Salvar' onPress={() => {}} />
    </View>
  );
}