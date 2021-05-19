import React, { useEffect, useState, Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid, Alert, Modal, Button, TouchableOpacity, Animated, Dimensions, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';



function MapScreen() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dados, setDados] = useState(0);



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



    // function aqui() {
    //     return(
    //         <Modal transparent={true}>
    //         <Animated.View style={[open]}>
    //             <View style={[styles.container2, styles.center]}>
    //                 {data.filter(marker => marker.estado == 1).map(marker => (
    //                     <View style={[styles.wrap]}>
    //                         <Text style={styles.title}>{marker.nome}</Text>
    //                         <Text>Morada: {marker.morada}</Text>
    //                         <Text>Contacto: {marker.contacto}</Text>
    //                         <Text>Dia do Cozido: {marker.diaCozido}</Text>
    //                         <Text>Horário: {marker.horaInicio}h - {marker.horaFim}h</Text>
    //                         <Text>Preço: {marker.precoMinimo}€ - {marker.precoMaximo}€</Text>
    //                         <View style={{ flexDirection: "row" }}>
    //                             <TouchableOpacity style={[styles.modalButton, styles.center]} onPress={close}>
    //                                 <Text>Close</Text>
    //                             </TouchableOpacity>
    //                             <TouchableOpacity style={[styles.modalButton, styles.center]} onPress={save}>
    //                                 <Text>Save</Text>
    //                             </TouchableOpacity>
    //                         </View>

    //                     </View>
    //                 ))}
    //             </View>
    //         </Animated.View>
    //     </Modal>
    //     )

    // }

    console.log(dados)

    return (
        <View style={styles.container}>



            <Modal  // modal para escolher trajeto ou multi objetivo
                style={{ width: 200, height: 120 ,backgroundColor:"transparent"}}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.container2, styles.center]}>

                {data.filter(marker => marker.id == dados).map(marker => (
                        <View style={[styles.wrap]}>
                            <Text style={styles.title}>{marker.nome}</Text>
                            <Text>Morada: {marker.morada}</Text>
                            <Text>Contacto: {marker.contacto}</Text>
                            <Text>Dia do Cozido: {marker.diaCozido}</Text>
                            <Text>Horário: {marker.horaInicio}h - {marker.horaFim}h</Text>
                            <Text>Preço: {marker.precoMinimo}€ - {marker.precoMaximo}€</Text>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.modalButton, styles.center]} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.center]}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}
                </View>

            </Modal>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={initialPosition}
            >
                <Marker
                    coordinate={markerPosition}
                    icon={require('../images/user.png')}
                ></Marker>

                {data.filter(marker => marker.estado == 1).map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
                        icon={require('../images/conf.png')}

                    >
                        <Callout onPress={() => { setModalVisible(true); setDados(marker.id) }}>
                            <Text style={styles.title}>{marker.nome}</Text>
                            <Text style={styles.info}>Ver mais informações</Text>

                        </Callout>



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
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    info: {
        fontSize:14,
        textAlign: 'center',
        color: '#1a73e8',
        fontWeight: 'bold'
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    wrap: {
        alignContent: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        shadowColor: "#4048BF",
        shadowOffset: {
            width: 8.4,
            height: 8.4
        },
        shadowOpacity: 0.74,
        shadowRadius: 30,
        elevation: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flex: 1,
        backgroundColor: "transparent"
    },
    modalButton: {
        backgroundColor: "transparent",
        borderRadius: 100,
        borderColor: "#ffffff",
        marginTop: 64,
        borderWidth: 1,
        paddingTop: 16,
        borderWidth: 1,
        paddingBottom: 16,
        paddingLeft: 25,
        paddingRight: 25,
        marginHorizontal: 5,
        flex: 1
    }
})


export default MapScreen;

