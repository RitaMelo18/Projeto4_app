import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
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

  console.log(idRecebido)


  useEffect(() => {
    fetch('http://apibackoffice.confrariadocozido.pt/api/get/restaurantesRecomendadosAll')
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false), setData(responseJson);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Text style={styles.cardText}>{nome}</Text>
      <View style={styles.container}>
        {data
          .filter(restaurante => restaurante.idRegiao == idRecebido)
          .map(restaurante => (
            <View key={restaurante.id}>
              <Text>{restaurante.nome}</Text>
              <Text></Text>
              <Text> </Text>
              <Text>Morada: {restaurante.morada}</Text>
              <Text> </Text>
              <Text>Contacto: {restaurante.contacto}</Text>
              <Text> </Text>
              <Text>
                Dia do Cozido: {restaurante.diaCozido}
              </Text>
              <Text> </Text>
              <Text>
                Horário: {restaurante.horaInicio}h - {restaurante.horaFim}h
                </Text>
              <Text> </Text>
              <Text>
                Preço: {restaurante.precoMinimo}€ - {restaurante.precoMaximo}€
                </Text>
              <Text>---------------------------------</Text>
            </View>
          ))}
        {/* <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center'
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