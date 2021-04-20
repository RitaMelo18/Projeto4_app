import * as React from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CozidoScreen from './HomePages/Cozido'

function HomeScreen({ navigation }) {
    let { container, cardText, card, cardImage } = styles
    return (
        <View style={container}>
            <TouchableOpacity style={card} onPress={() => navigation.navigate("Cozido")}>
                <Image style={cardImage} source={require('../images/logo.jpeg')}/>
                <Text style={cardText}>Card Title</Text>
            </TouchableOpacity>
            <Text>Página Inicial!</Text>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontSize: 30
    },
    card :{
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset :{
            width: 3,
            height: 3
        }
    },
    cardImage :{
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    }


})


export default App;
