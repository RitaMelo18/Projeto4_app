import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; //Ecrã responsivo
import RestauranteRegiaoScreen from './RestauranteRegiao';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



function FoodScreen({ navigation }) {
    const [itemR, setItem] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [email, setEmail] = useState([]);
    const [contacto, setContacto] = useState([]);

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

        fetch('http://apibackoffice.confrariadocozido.pt/api/get/email')
            .then(response => response.json())
            .then(responseJson => {
                setLoading2(false), setEmail(responseJson);
            })
            .catch(error => console.error(error));
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
                <TouchableOpacity onPress={() => { setItem(item), navigation.navigate("Restaurantes Recomendados", { Id: item.id, Nome: item.nome, Imagem: item.imagem }) }}>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: 'http://backoffice.confrariadocozido.pt/' + item.imagem }}
                    />
                    <Text style={styles.cardText}>
                        {item.nome.toUpperCase()}
                    </Text>
                    <Text></Text>
                </TouchableOpacity>
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
        // // Function for click on an item
        // alert('Id : ' + item.id + ' Title : ' + item.nome);

    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <Text></Text>
                <FlatList
                style={{height:hp('25%'), width: wp('95%'), marginLeft:10}}
                    data={email}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                            <ScrollView>
                            <Text style={styles.info}>{`Caso queira aderir e ser recomendado contacte:\n` + item.valor + ``}</Text>
                            </ScrollView>
                    )}
                />
                <SearchBar
                    platform='android'
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={(text) => searchFilterFunction('')}
                    placeholder="Procure uma Região..."
                    value={search}
                />
                <FlatList
                    style={{ paddingBottom: 100}}
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    );
};

function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Restaurante">
                <Stack.Screen
                    name="Restaurante"
                    component={FoodScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Restaurantes Recomendados"
                    component={RestauranteRegiaoScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10,
        marginTop:-20
    },
    info: {
        width: wp('90%'),
        height: hp('19%'),
        borderColor: '#44753d',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        left: 5,
        right: 5,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 16,
        lineHeight:20,
        marginTop:8
    },
    cardImage: {
        width: wp('95%'),
        height: hp('20%'),
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 16,
        textAlign: 'center',
    }
});



export default App;
