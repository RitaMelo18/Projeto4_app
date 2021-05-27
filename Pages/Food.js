import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
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

function FoodScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [RegiaoSelecionada, setRegiaoSelecionada] = useState([]);
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        fetch('http://apibackoffice.confrariadocozido.pt/api/get/regioesRestaurantes')
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
        <View>
            <Text></Text>
            <Text style={styles.info}>{`Caso queira aderir e ser recomendado contacte:\nXXXXXXXXX`}</Text>
            <View>
                <SearchBar
                    round={true}
                    lightTheme={true}
                    platform='android'
                    // placeholder="Search"
                    icon={() => <FontAwesome5 class="far fa-search" size={30} color={"#FFF"} />}
                />
            </View>
            <View style={styles.container, styles.card}>
                <FlatList
                    style={{ height: hp('100%') }}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FFF' }}>
                            <TouchableOpacity  onPress={() => {setRegiaoSelecionada(item.nome), console.log(RegiaoSelecionada)

                            }}>
                                <Image
                                    style={styles.cardImage}
                                    source={{ uri: 'http://backoffice.confrariadocozido.pt/' + item.imagem }}
                                />
                                <Text style={styles.cardText}>
                                    {item.nome}
                                </Text>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />



            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    info: {
        width: 375,
        height: 78,
        borderColor: '#44753d',
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
        right: 10,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20
    },
    container: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        marginRight: '2%',
        width: wp('95%'),
        marginTop: 5,
        height: hp('100%'),
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 5,
            height: 5,
        },
    },
    cardImage: {
        width: wp('95%'),
        height: hp('20%'),
        resizeMode: 'cover',
    }

})


export default FoodScreen;
