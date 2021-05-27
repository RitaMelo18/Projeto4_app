import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';

function FoodScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={
          styles.info
        }>{`Caso queira aderir e ser recomendado contacte:\nXXXXXXXXX`}</Text>
      <View>
        <SearchBar
          round={true}
          lightTheme={true}
          platform="ios"
          icon={() => (
            <FontAwesome5 class="far fa-search" size={30} color={'#FFF'} />
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
    lineHeight: 20,
  },
  container: {
    marginTop: 60,
    flex: 1,
  },
});

export default FoodScreen;
