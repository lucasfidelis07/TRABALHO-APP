import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Helmet = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [searchText, setSearchText] = useState('');
  const productPrice = 150.00; // Defina o preço do produto aqui

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Feather
          key={i}
          name="star"
          size={18}
          color={i < rating ? '#FFD700' : '#E0E0E0'}
        />
      );
    }
    return stars;
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

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.buyContainer}>
          <Text style={styles.productPrice}>R$ {productPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
        
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

        {/* Comentários dos Clientes */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Comentários dos Clientes</Text>
          <View style={styles.review}>
            <Text style={styles.reviewName}>Carlos Silva</Text>
            <View style={styles.starsContainer}>{renderStars(5)}</View>
            <Text style={styles.reviewText}>Ótimo capacete! Confortável e estiloso.</Text>
          </View>
          <View style={styles.review}>
            <Text style={styles.reviewName}>Ana Oliveira</Text>
            <View style={styles.starsContainer}>{renderStars(4)}</View>
            <Text style={styles.reviewText}>Bom custo-benefício. Recomendo!</Text>
          </View>
          <View style={styles.review}>
            <Text style={styles.reviewName}>João Souza</Text>
            <View style={styles.starsContainer}>{renderStars(5)}</View>
            <Text style={styles.reviewText}>Excelente qualidade e design. Muito satisfeito.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
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
    backgroundColor: '#FAFAFA',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center'
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  toggleButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewsContainer: {
    width: '100%',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  review: {
    marginBottom: 20,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerItem: {
    alignItems: 'center',
  },
});

export default Helmet;
