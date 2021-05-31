import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo

function RestauranteRegiao({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // React.useEffect(() => {
  //   if (route.params?.Nome) {
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //   }
  // }, [route.params?.Nome]);
  const nome = route.params?.Nome
  const idRecebido = route.params?.Id
  const imagem = route.params?.Imagem

  console.log(imagem)


  useEffect(() => {
    fetch('http://apibackoffice.confrariadocozido.pt/api/get/restaurantesRecomendadosAll')
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false), setData(responseJson);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.cardText}>{nome}</Text>
        <Text></Text>
        <Image
          style={{ width: wp('97%'), height: hp('25%'), alignContent: 'center', justifyContent: 'center', alignItems: 'center', left: 6, right: 6, top: 5, bottom: 5 }}
          source={{ uri: 'http://backoffice.confrariadocozido.pt/' + imagem }}
        />
        <Text style={{ borderBottomColor: '#44753d', borderBottomWidth: 1 }}></Text>

        <View style={styles.container}>
          {data
            .filter(restaurante => restaurante.idRegiao == idRecebido)
            .map(restaurante => (
              <View key={restaurante.id} style={{ borderBottomColor: '#44753d', borderBottomWidth: 1 }}>
                <Text></Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, lineHeight: 30 }}>{restaurante.nome}</Text>
                <Text style={{ fontSize: 15, marginLeft: 10, lineHeight: 20 }}>Morada: {restaurante.morada}</Text>
                <Text style={{ fontSize: 15, marginLeft: 10, lineHeight: 20 }}>Contacto: {restaurante.contacto}</Text>
                <Text style={{ fontSize: 15, marginLeft: 10, lineHeight: 20 }}>Dia do Cozido: {restaurante.diaCozido}</Text>
                <Text style={{ fontSize: 15, marginLeft: 10, lineHeight: 20 }}>Horário: {restaurante.horaInicio}h - {restaurante.horaFim}h</Text>
                <Text style={{ fontSize: 15, marginLeft: 10, lineHeight: 20 }}>Preço: {restaurante.precoMinimo}€ - {restaurante.precoMaximo}€</Text>
                <Text></Text>
              </View>
            ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS) === 'android' ? 2 : 0,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  itemStyle: {
    padding: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  info: {
    width: wp('90%'),
    height: hp('10%'),
    borderColor: '#44753d',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
    right: 5,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20
  },
  cardImage: {
    width: wp('95%'),
    height: hp('20%'),
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 10
  }
});


export default RestauranteRegiao;