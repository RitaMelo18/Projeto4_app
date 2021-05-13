import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';

function CreditosScreen() {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View >
                <Image style={{ width: 350, height: 250, resizeMode: 'contain' }} source={require('../../images/creditos2.png')} />
                <Text>TEXTO</Text>
            </View>
        </View>

    );
}

export default CreditosScreen;