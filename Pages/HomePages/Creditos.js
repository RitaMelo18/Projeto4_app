import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';

function CreditosScreen() {
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
        return () => setDidMount(false);
     }, [])
     
     if(!didMount) {
       return null;
     }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <View >
                <Image style={{ width: 350, height: 250, resizeMode: 'contain' }} source={require('../../images/creditos2.png')} />
                <Text style={{textAlign: 'justify'}}>TEXTO</Text>
            </View>
        </View>

    );
}

export default CreditosScreen;