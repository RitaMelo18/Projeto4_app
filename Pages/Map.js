import React, { useEffect, useState, Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid, Alert, Modal, Button, TouchableOpacity, Animated, Dimensions, Pressable, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { Rating, AirbnbRating } from 'react-native-ratings'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; //Ecrã responsivo


function MapScreen() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dados, setDados] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [numeroVotos, setNVotos] = useState(0);
    const [somatorioAvaliacao, setSomatorioAval] = useState(0);

    const PutsomatorioAval = somatorioAvaliacao + ratingCount;
    const PutNumeroVotos = numeroVotos + 1;
    const PutMediaAva = PutsomatorioAval / PutNumeroVotos;

    // const rating = 0;

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


    useEffect(() => {
        {
            data.filter(marker => marker.id == dados).map(marker => (
                setNVotos(marker.nVotos),
                setSomatorioAval(marker.somatorioAval)
            ))
        }

    })


    // console.log(ratingCount)
    // console.log(avaliaçaoTotal)
    // console.log(nVotos)
    // console.log(somatorioAvaliacao)
    
    function postAvaliacao() {
        if(ratingCount == 0){
            ToastAndroid.showWithGravity("Insira uma avaliação entre 1 e 5.", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: dados,
                avaliacaoTotal: PutMediaAva,
                somatorioAval: PutsomatorioAval,
                nVotos: PutNumeroVotos
            })
        }
        fetch('http://apibackoffice.confrariadocozido.pt/api/updateAvaliacao', requestOptions)
            .then(
                setModalVisible(!modalVisible),
                ToastAndroid.showWithGravity(
                    "Erro",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                ))


            .catch(
                console.log("Erro ao fazer o post da avaliação"),
                ToastAndroid.showWithGravity(
                    "Avaliação registada!",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            )

        }
        




    }





    return (
        <View style={styles.container}>



            <Modal  // modal para escolher trajeto ou multi objetivo
                style={{ backgroundColor: "transparent" }}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[styles.container2, styles.center]}>

                    {data.filter(marker => marker.id == dados).map(marker => (
                        <View style={[styles.wrap]} key={marker.id}>
                            <Text style={styles.title}>{marker.nome}</Text>
                            <Text></Text>
                            <Rating readonly={true}
                                type='custom'
                                fractions="{1}"
                                startingValue={marker.avaliacaoTotal}
                                count={5}
                                imageSize={30}
                                showRating={false}
                                style={{ paddingHorizontal: 10 }}

                            />
                            <Text> </Text>
                            <Text style={styles.text}>Morada: {marker.morada}</Text>
                            <Text> </Text>
                            <Text style={styles.text}>Contacto: {marker.contacto}</Text>
                            <Text> </Text>
                            <Text style={styles.text}>Dia do Cozido: {marker.diaCozido}</Text>
                            <Text> </Text>
                            <Text style={styles.text}>Horário: {marker.horaInicio}h - {marker.horaFim}h</Text>
                            <Text> </Text>
                            <Text style={styles.text}>Preço: {marker.precoMinimo}€ - {marker.precoMaximo}€</Text>
                            <Text> </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>A sua avaliação</Text>
                            <AirbnbRating
                                defaultRating={0}
                                count={5}
                                size={25}
                                reviewSize={24}
                                reviews={[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5
                                ]}
                                onFinishRating={rating => setRatingCount(rating)}
                            // // selectedColor="#44753d"
                            // // reviewColor="#44753d"
                            // starImage={require('../images/colher.png')}

                            // onPress={() => setDefaultRating(onFinishRating)}

                            />

                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={[styles.modalButton, styles.center]} onPress={() => { postAvaliacao(); setModalVisible(!modalVisible) }} >
                                    <Text  style={{ color: '#1a73e8', }}>Avaliar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.center]} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={{ color: '#1a73e8', }}>Fechar</Text>
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
                showsUserLocation={true}
            >
                <Marker
                    coordinate={markerPosition}
                    // icon={require('../images/user2.png')}
                    // pinColor={'#03A9F4'}
                    opacity={0}
                   
                ></Marker>

                {data.filter(marker => marker.estado == 1).map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
                        // icon={require('../images/conf3.png')}
                        pinColor={'#00FF00'}

                    >
                        <Callout tooltip onPress={() => { setModalVisible(true); setDados(marker.id) }}>
                            <View style={[styles.wrap2]}>
                                <Text style={styles.title2}>{marker.nome}</Text>

                                <Text style={styles.info}>Ver mais informações</Text>
                            </View>
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
        height: hp('100%'),
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        textAlign: 'center',
        color: '#1a73e8',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
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
        padding: 30,
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
    wrap2: {
        justifyContent: 'center',
        height: 60,
        width: 180,
        alignContent: 'center',
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