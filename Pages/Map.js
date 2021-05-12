import React, { useEffect, useState, Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { color } from 'react-native-reanimated';


function MapScreen() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [initialPosition, setInicialPosition] = useState({
        latitude: 41.6946,
        longitude: -8.83016,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 41.6946,
        longitude: -8.83016,
    });
    const handleSuccess = position => {
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)

        var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }
        setInicialPosition(initialRegion)
        setMarkerPosition(initialRegion)
    };

    const handleError = error => {
        setError(error.message);
    };

    useEffect(() => {
        fetch('http://apibackoffice.confrariadocozido.pt/api/get/restaurantes')
            .then((response) => response.json())
            .then((responseJson) => {
                setLoading(false),
                    setData(responseJson)
            })
            .catch((error) => console.error(error))
    }, []);

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
                    pinColor='blue'
                ></Marker>

                {data.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
                        pinColor='#44753d'
                    >
                        <Callout onPress={Callout}>
                            <Text  style={styles.title}>{marker.nome}</Text>
                            <Text>Morada: {marker.morada}</Text>
                            <Text>Contacto: {marker.contacto}</Text>
                            <Text>Dia do Cozido: {marker.diaCozido}</Text>
                            <Text>Horário: {marker.horaInicio}h - {marker.horaFim}h</Text>
                            <Text>Preço: {marker.precoMinimo}€ - {marker.precoMaximo}€</Text>
                        </Callout>
                        {console.log(marker.latitude)}
                    </Marker>
                ))}
            </MapView>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})


export default MapScreen;