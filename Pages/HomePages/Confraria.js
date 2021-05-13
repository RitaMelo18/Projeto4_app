import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, Image } from 'react-native';

function ConfrariaScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://apibackoffice.confrariadocozido.pt/api/get/descrConfraria')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    });

    return (
        <View style={{ flex: 1, padding: 24 }}>
             
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <View >
                        <Image style={{width:350, height:250, resizeMode:'contain'}} source={require('../../images/confraria.jpg')} />
                        <Text>{item.valor}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default ConfrariaScreen;