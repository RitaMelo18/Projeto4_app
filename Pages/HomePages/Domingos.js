import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function DomingosScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://apibackoffice.confrariadocozido.pt/api/get/descrDomingos')
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
                        <Text>{item.valor}</Text>
                    )}
                />
            )}
        </View>
    );
};

export default DomingosScreen;