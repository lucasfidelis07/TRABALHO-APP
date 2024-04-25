import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import * as Location from 'expo-location';

const productsData = [
  { id: 1, name: 'Capacete Modelo A', description: 'Capacete de alta qualidade com design aerodinâmico.', price: 30, image: require('./images/capacete2.jpg') },
  { id: 2, name: 'Capacete Modelo B', description: 'Capacete leve e resistente, ideal para longas viagens.', price: 50, image: require('./images/capacete3.jpg') },
];

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [city, setCity] = useState('');

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão negada para acessar a localização');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('Location:', location);

    let { latitude, longitude } = location.coords;

    let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    console.log('Geocode:', geocode);
    
    if (geocode && geocode.length > 0) {
      let { city } = geocode[0];
      setCity(city || '');
    }
  };

  const handleLocationPress = () => {
    fetchLocation();
  };

  const renderProductItem = ({ item }: { item: typeof productsData[0] }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Link href="/helmet">
          <Text style={styles.buyButtonText}>Comprar</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* BARRA DE PESQUISA */}
      <View style={styles.searchBarContainer}>
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

      {/* BOTÃO DE LOCALIZAÇÃO */}
      <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
        <Text style={styles.locationButtonText}>Minha Cidade: {city || 'Clique para obter a localização'}</Text>
      </TouchableOpacity>

      {/* BANNER DE BOAS-VINDAS */}
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeText}>SEJAM BEM-VINDOS À DUAS RODAS MOTORSPORT. CONFIRA ALGUNS PRODUTOS:</Text>
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={productsData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* FOOTER COM BOTÕES DE NAVEGAÇÃO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/"}>
            <View style={styles.footerItem}>
              <Feather name="home" size={24} color="#FF6D00" />
              <Text style={styles.footerText}>Home</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/department"}>
            <View style={styles.footerItem}>
              <Feather name="grid" size={24} color="#FF6D00" />
              <Text style={styles.footerText}>Departamentos</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/login"}>
            <View style={styles.footerItem}>
              <Feather name="user" size={24} color="#FF6D00" />
              <Text style={styles.footerText}>Login</Text>
            </View>
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
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
  productItem: {
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#FF6D00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
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
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 5,
    color: '#FF6D00',
  },
});
