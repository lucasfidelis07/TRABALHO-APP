import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { firestore } from './../config/firebase-config';
import { collection, doc, getDoc } from 'firebase/firestore';

interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Helmet = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDocRef = doc(collection(firestore, "products"), "xdWvKpcL5DVfrUqf59QX");
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
          setProduct(productDoc.data() as Product);
        } else {
          throw new Error("Document does not exist!");
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchProduct();
  }, []);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
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
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        ) : (
          <Text>Imagem não disponível</Text>
        )}
        <View style={styles.buyContainer}>
          <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.productTitle}>{product.name}</Text>
        <TouchableOpacity onPress={toggleDescription} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {showDescription ? 'Ocultar Descrição' : 'Mostrar Descrição'}
          </Text>
        </TouchableOpacity>
        {showDescription && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.productDescription}>CONTEÚDO DA EMBALAGEM:</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        )}
      </ScrollView>

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
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
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
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
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
