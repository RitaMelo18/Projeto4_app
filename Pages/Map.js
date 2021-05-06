import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

function MapScreen() {
    return (
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
                latitude:41.6946,
                longitude: -8.83016,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        ></MapView>
    </View>
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text>Mapa!</Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    },
})

export default MapScreen;