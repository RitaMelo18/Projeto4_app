import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo

function DomingosScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    fetch('http://apibackoffice.confrariadocozido.pt/api/get/descrDomingos')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  });

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <View>
              <Image
                style={{
                  width: wp('90%'),
                  height: hp('35%'),
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../images/confraria2.jpg')}
              />
              <Text style={{textAlign: 'justify', lineHeight: 20}}>
                {item.valor}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default DomingosScreen;
