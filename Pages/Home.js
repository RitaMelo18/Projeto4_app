import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CozidoScreen from './HomePages/Cozido'

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página Inicial!</Text>
            <Button
                title="Go to Cozido eheh"
                onPress={() => navigation.navigate("Cozido")}
            />
        </View>
    );
}



function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
                <Stack.Screen name="Cozido" component={CozidoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
