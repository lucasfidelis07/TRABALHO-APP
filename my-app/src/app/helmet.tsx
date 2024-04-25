import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Helmet = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <View style={styles.container}>
      {/* Botão de Pesquisa */}
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

      <View style={styles.contentContainer}>
        <Text style={styles.productTitle}>
          Capacete Axxis Draken Vector Matt Preto/Cinza Fosco
        </Text>
        <Image
          source={require('./images/capacete2.jpg')}
          style={styles.productImage}
        />
        <TouchableOpacity onPress={toggleDescription} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {showDescription ? 'Ocultar Descrição' : 'Mostrar Descrição'}
          </Text>
        </TouchableOpacity>
        {showDescription && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.productDescription}>
              CONTEÚDO DA EMBALAGEM:
            </Text>
            <Text style={styles.productDescription}>
              - 1 Capacete (com viseira transparente)
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
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
    marginTop: 10,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  toggleButton: {
    backgroundColor: '#FF6D00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  toggleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
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

export default Helmet;
