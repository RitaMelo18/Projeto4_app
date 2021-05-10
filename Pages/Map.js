import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

function MapScreen() {
    const [error, setError] = useState();
    const [initialPosition, setInicialPosition] = useState({
        latitude:41.6946,
        longitude: -8.83016,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    const [markerPosition, setMarkerPosition] = useState({
        latitude:41.6946,
        longitude: -8.83016
    });
    const handleSuccess = position => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }
        setInicialPosition(initialRegion)
        setMarkerPosition(initialPosition)
    };

    const handleError = error => {
        setError(error.message);
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);

    useEffect(() => {
        const watchId = Geolocation.watchPosition(handleSuccess, handleError);
        return () => Geolocation.clearWatch(watchId);
    }, []);

    return (
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={initialPosition}
        >
        <Marker
            coordinate={markerPosition}
        ></Marker>    
        </MapView>
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