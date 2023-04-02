import { View, Text, TextInput, Button } from 'react-native'

export function Profile() {
  return (
    <View>
      <Text testID="title">Perfil</Text>

      <TextInput 
        testID="input-name" 
        placeholder="Nome" 
        autoCorrect={false} 
        value="Marlison"
      />

      <TextInput 
        testID="input-surname" 
        placeholder="E-mail" autoCorrect={false}
        value="Mourão" 
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}