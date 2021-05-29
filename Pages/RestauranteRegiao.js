import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';

function RestauranteRegiao(navigation) {

  return (
    <View>
        <Text>{navigation.getParam('nome')}</Text>
    </View>
  );
}

export default RestauranteRegiao;