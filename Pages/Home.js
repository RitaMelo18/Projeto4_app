import * as React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CozidoScreen from './HomePages/Cozido';
import ConfrariaScreen from './HomePages/Confraria';
import DomingosScreen from './HomePages/Domingos';
import CreditosScreen from './HomePages/Creditos';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo

function HomeScreen({ navigation }) {
    let { container, cardText, card, cardImage} = styles
    return (
        <View style={container}>
            <TouchableOpacity style={card} onPress={() => navigation.navigate("Cozido")}>
                <Image style={cardImage} source={require('../images/cozido.jpeg')} />
                <Text style={cardText}>Cozido à Portuguesa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={card} onPress={() => navigation.navigate("Confraria")}>
                <Image style={cardImage} source={require('../images/confraria.jpg')} />
                <Text style={cardText}>Confraria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={card} onPress={() => navigation.navigate("Domingos Rodrigues")}>
                <Image style={cardImage} source={require('../images/domingos.jpg')} />
                <Text style={cardText}>Domingos Rodrigues</Text>
            </TouchableOpacity>
            <TouchableOpacity style={card} onPress={() => navigation.navigate("Créditos")}>
                <Image style={cardImage} source={require('../images/creditos2.png')} />
                <Text style={cardText}>Créditos</Text>
            </TouchableOpacity>

        </View>
    );
}

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Cozido" component={CozidoScreen} />
        <Stack.Screen name="Confraria" component={ConfrariaScreen} />
        <Stack.Screen name="Domingos Rodrigues" component={DomingosScreen} />
        <Stack.Screen name="Créditos" component={CreditosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    marginRight: '2%',
    width: wp('95%'),
    height: hp('20%'),
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 5,
      height: 5,
    },
   
  },
  cardImage: {
    width: wp('95%'),
    height: hp('15%'),
    resizeMode: 'cover',
   
  },
});

export default App;
