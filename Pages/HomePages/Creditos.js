import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo

function CreditosScreen() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <View style={{flex: 1, padding: 24}}>
      <View>
        <Image
          style={{
            width: wp('90%'),
            height: hp('35%'),
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../../images/creditos2.png')}
        />
        <Text style={{textAlign: 'justify', lineHeight: 20}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>{`Equipa de Desenvolvimento\n`}</Text>
          <Text style={{fontSize: 14}}>{`Ana Rita Melo\nJoão Lopes\n\n`}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>{`Equipa de Publicação\n`}</Text>
          <Text
            style={{
              fontSize: 14,
            }}>{`Ana Rita Melo\nJoão Lopes\nHélder Gonçalves\nAlunos do Curso de Engenharia Informática\n\n`}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>{`Supervisão Técnica\n`}</Text>
          <Text style={{fontSize: 14}}>{`Sara Paiva`}</Text>
        </Text>
      </View>
    </View>
  );
}

export default CreditosScreen;
