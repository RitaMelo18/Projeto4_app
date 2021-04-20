import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './Pages/Home'
import MapScreen from './Pages/Map'
import RestauranteScreen from './Pages/Food'

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Página Inicial!</Text>
//       </View>
//     );
//   }
// }

// class MapScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Mapa!</Text>
//       </View>
//     );
//   }
// }

// class RestauranteScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Restaurantes!</Text>
//       </View>
//     );
//   }
// }


const TabNavigator = createBottomTabNavigator(
  {
    Início: HomeScreen,
    Mapa: MapScreen,
    Restaurantes: RestauranteScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({  tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome5;
        let iconName;
        if (routeName === 'Início') {
          iconName = 'home'
        } else if (routeName === 'Mapa') {
          iconName = 'map-marker-alt'
        } else if (routeName === 'Restaurantes') {
          iconName = 'utensils'
        }

        // You can return any component that you like here!
        return <FontAwesome5  name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#376034",
      inactiveTintColor: 'gray',

    },
  }
);

export default createAppContainer(TabNavigator);
