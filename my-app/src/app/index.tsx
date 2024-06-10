import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import * as Location from 'expo-location';

const productsData = [
  { id: 1, name: 'Capacete Modelo A', description: 'Capacete de alta qualidade com design aerodinâmico.', price: 30, image: require('./images/capacete2.jpg') },
  { id: 2, name: 'Capacete Modelo B', description: 'Capacete leve e resistente, ideal para longas viagens.', price: 50, image: require('./images/capacete3.jpg') },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão negada para acessar a localização');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (geocode && geocode.length > 0) {
      let { city } = geocode[0];
      setCity(city || '');
    }
  };

  const renderProductItem = ({ item }: { item: typeof productsData[0] }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Link href={item.id === 2 ? "/helmet2" : "/helmet"}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produtos"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.locationButton} onPress={fetchLocation}>
        <Text style={styles.locationButtonText}>Minha Cidade: {city || 'Clique para obter a localização'}</Text>
      </TouchableOpacity>

      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>SEJAM BEM-VINDOS À DUAS RODAS MOTORSPORT. CONFIRA ALGUNS PRODUTOS:</Text>
      </View>

      <FlatList
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/">
            <Feather name="home" size={24} color="#FF6D00" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/department">
            <Feather name="grid" size={24} color="#FF6D00" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/login">
            <Feather name="user" size={24} color="#FF6D00" />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#FF6D00',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  locationButton: {
    backgroundColor: '#FF6D00',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeBanner: {
    backgroundColor: '#FF6D00',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  productList: {
    paddingVertical: 10,
  },
  productItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6D00',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#FF6D00',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  footerIcon: {
    alignItems: 'center',
  },
});
