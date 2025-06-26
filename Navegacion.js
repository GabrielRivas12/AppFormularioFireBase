import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Formulario from './Componentes/Formulario';
import Lista from './Screens/Lista';

const Stack = createStackNavigator();

function StackDetalles() {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen name="Home" component={Lista} />
      <Stack.Screen name="Lista" component={Lista} />
      <Stack.Screen name="Formulario" component={Formulario} />
    </Stack.Navigator>
  );
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <StackDetalles />
    </NavigationContainer>
  );
}
