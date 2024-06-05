import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const helmetsData = [
  { id: 2, name: 'Capacete Axxis Draken', price: 50, image: require('./images/capacete2.jpg') },
  { id: 3, name: 'Capacete ASX', price: 70, image: require('./images/capacete3.jpg') },
  { id: 4, name: 'Capacete Pro Tork', price: 100, image: require('./images/capacete4.jpg') },
];

export default function Helmets() {
  const renderHelmetItem = ({ item }: { item: { id: number, name: string, price: number, image: any } }) => (
    <View style={styles.helmetItem}>
      <Image source={item.image} style={styles.helmetImage} />
      <Text style={styles.helmetTitle}>{item.name}</Text>
      <Text style={styles.helmetPrice}>R$ {item.price.toFixed(2)}</Text>
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
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE CAPACETES */}
      <FlatList
        data={helmetsData}
        renderItem={renderHelmetItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.helmetsContainer}
      />

      {/* FOOTER COM BOTÕES DE NAVEGAÇÃO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/"}>
            <View style={styles.footerItem}>
              <Feather name="home" size={24} color="#FF6D00" />
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/department"}>
            <View style={styles.footerItem}>
              <Feather name="grid" size={24} color="#FF6D00" />
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href={"/login"}>
            <View style={styles.footerItem}>
              <Feather name="user" size={24} color="#FF6D00" />
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
    paddingBottom: 60, 
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 20, 
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#FF6D00',
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  helmetsContainer: {
    paddingHorizontal: 8,
  },
  helmetItem: {
    width: '48%', 
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  helmetImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  helmetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  helmetPrice: {
    fontSize: 16,
    color: '#FF6D00',
    marginBottom: 5,
  },
  buyButton: {
    backgroundColor: '#FF6D00',
    padding: 10,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerItem: {
    alignItems: 'center',
  },
});

