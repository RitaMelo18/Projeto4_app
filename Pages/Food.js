import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { SearchBar } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo
import { Platform } from 'react-native';



const FoodScreen = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('http://apibackoffice.confrariadocozido.pt/api/get/regioesRestaurantes')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.nome
                    ? item.nome.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <View>
                <Image
                    style={styles.cardImage}
                    source={{ uri: 'http://backoffice.confrariadocozido.pt/' + item.imagem }}
                />
                <Text style={styles.cardText} onPress={() => getItem(item)}>
                    {item.nome.toUpperCase()}
                </Text>
                <Text></Text>
            </View>

        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.nome);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <Text></Text>
                <Text style={styles.info}>{`Caso queira aderir e ser recomendado contacte:\nXXXXXXXXX`}</Text>
                <SearchBar
                    platform='android'
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Procure uma Região..."
                    value={search}
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center'
    },
    itemStyle: {
        padding: 10,
        alignContent:'center',
        alignItems:'center'
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
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    }
});

export default FoodScreen;
