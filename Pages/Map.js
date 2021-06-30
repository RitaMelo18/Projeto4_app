import React, {useEffect, useState, Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Modal,
  Button,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  TouchableNativeFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let latDelta = 0.01;
let lngDelta = 0.01;
let lat;
let lng;

function MapScreen() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [numeroVotos, setNVotos] = useState(0);
  const [somatorioAvaliacao, setSomatorioAval] = useState(0);
  const [loading2, setLoading2] = useState(false);
  const [localizacao, setLocalizacao] = useState(false);

  const PutsomatorioAval = somatorioAvaliacao + ratingCount;
  const PutNumeroVotos = numeroVotos + 1;
  const PutMediaAva = PutsomatorioAval / PutNumeroVotos;

  // const rating = 0;

  const [initialPosition, setInicialPosition] = useState({
    latitude: 38.72567813080763,
    longitude: -9.139776001610233,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 41.6946,
    longitude: -8.83016,
  });

  useEffect(() => {
    fetch('http://apibackoffice.confrariadocozido.pt/api/get/restaurantes')
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false), setData(responseJson);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    {
      data
        .filter(marker => marker.id == dados)
        .map(
          marker => (
            setNVotos(marker.nVotos), setSomatorioAval(marker.somatorioAval)
          ),
        );
    }
  });

  useEffect(() => {
    findCoordinates();
  }, []);

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = JSON.stringify(position.coords.latitude);
        const lng = JSON.stringify(position.coords.longitude);
        if (lat !== undefined) {
          setInicialPosition({
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
          setLocalizacao(true);
          setLoading2(true);
        }
      },
      error => findCoordinates(),
      {enableHighAccuracy: true, timeout: 1000, maximumAge: 1000},
    );
  };

  function postAvaliacao() {
    if (ratingCount == 0) {
      ToastAndroid.showWithGravity(
        'Insira uma avaliação entre 1 e 5.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: dados,
          avaliacaoTotal: PutMediaAva,
          somatorioAval: PutsomatorioAval,
          nVotos: PutNumeroVotos,
        }),
      };
      fetch(
        'http://apibackoffice.confrariadocozido.pt/api/updateAvaliacao',
        requestOptions,
      )
        .then(
          setModalVisible(!modalVisible),
          ToastAndroid.showWithGravity(
            'Erro',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          ),
        )

        .catch(
          ToastAndroid.showWithGravity(
            'Avaliação registada!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            setRatingCount(0),
          ),
        );
    }
  }

  userLocationChanged = event => {
    const newRegion = event.nativeEvent.coordinate;

    lat = newRegion.latitude;
    lng = newRegion.longitude;
  };

  changeRegion = event => {
    latDelta = event.latitudeDelta * 0.33426815;
    lngDelta = event.longitudeDelta * 0.33426815;

    //console.log("LATD1: " + latDelta + " LNGD1: " + lngDelta)
  };

  centrarUtl = () => {
    var initialRegion = {
      latitude: lat,
      longitude: lng,
      longitudeDelta: latDelta, //0,7742681499201246
      latitudeDelta: lngDelta,
    };
    setInicialPosition(initialRegion);
  };

  const carregarPagina = () => {
    setTimeout(() => {
      setLoading2(true);
    }, 3000);
  };

  if (!loading2) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#44753d" />
        <Text>Carregando</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Modal // modal para escolher trajeto ou multi objetivo
          style={{backgroundColor: 'transparent'}}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.container2, styles.center]}>
            {data
              .filter(marker => marker.id == dados)
              .map(marker => (
                <View style={[styles.wrap]} key={marker.id}>
                  <Text style={styles.title}>{marker.nome}</Text>
                  <Text></Text>
                  <Rating
                    readonly={true}
                    type="custom"
                    fractions="{1}"
                    startingValue={marker.avaliacaoTotal}
                    count={5}
                    imageSize={30}
                    showRating={false}
                    style={{paddingHorizontal: 10}}
                  />
                  <Text> </Text>
                  <Text style={styles.text}>Morada: {marker.morada}</Text>
                  <Text> </Text>
                  <Text style={styles.text}>Contacto: {marker.contacto}</Text>
                  <Text> </Text>
                  <Text style={styles.text}>
                    Dia do Cozido: {marker.diaCozido}
                  </Text>
                  <Text> </Text>
                  <Text style={styles.text}>
                    Horário: {marker.horaInicio}h - {marker.horaFim}h
                  </Text>
                  <Text> </Text>
                  <Text style={styles.text}>
                    Preço: {marker.precoMinimo}€ - {marker.precoMaximo}€
                  </Text>
                  <Text> </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    A sua avaliação
                  </Text>
                  <AirbnbRating
                    defaultRating={0}
                    count={5}
                    size={25}
                    reviewSize={24}
                    reviews={[1, 2, 3, 4, 5]}
                    onFinishRating={rating => setRatingCount(rating)}
                    // // selectedColor="#44753d"
                    // // reviewColor="#44753d"
                    // starImage={require('../images/colher.png')}

                    // onPress={() => setDefaultRating(onFinishRating)}
                  />

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.center]}
                      onPress={() => {
                        postAvaliacao();
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={{color: '#1a73e8'}}>Avaliar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.center]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={{color: '#1a73e8'}}>Fechar</Text>
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
          onUserLocationChange={event => this.userLocationChanged(event)}
          onRegionChangeComplete={event => this.changeRegion(event)}>
          {data
            .filter(marker => marker.estado == 1)
            .map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: Number(marker.latitude),
                  longitude: Number(marker.longitude),
                }}
                // icon={require('../images/conf3.png')}
                pinColor={'#00FF00'}>
                <Callout
                  tooltip
                  onPress={() => {
                    setModalVisible(true);
                    setDados(marker.id);
                  }}>
                  <View style={[styles.wrap2]}>
                    <Text style={styles.title2}>{marker.nome}</Text>

                    <Text style={styles.info}>Ver mais informações</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
        <View
          style={{
            position: 'absolute', //use absolute position to show button on top of the map
            alignSelf: 'flex-end', //for align to right
          }}>
          <FontAwesome5
            name={'street-view'}
            size={35}
            color={'#44753d'}
            style={{margin: 20, marginTop: 50}}
            onPress={() => {
              localizacao === false ? findCoordinates() : centrarUtl();
            }}
          />
        </View>
      </View>
    );
  }
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
    fontWeight: 'bold',
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
    backgroundColor: '#ffffff',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  wrap2: {
    justifyContent: 'center',
    height: 60,
    width: 180,
    alignContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#4048BF',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('20%'),
    width: wp('100%'),
  },
  modalButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: '#ffffff',
    marginTop: 64,
    borderWidth: 1,
    paddingTop: 16,
    borderWidth: 1,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginHorizontal: 5,
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
