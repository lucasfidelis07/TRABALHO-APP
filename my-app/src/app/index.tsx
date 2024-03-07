import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER DA PÁGINA */}
      <View style={styles.header}>
        <Text style={styles.username}>Seja Bem-Vindo</Text>
        <TouchableOpacity style={styles.buttonUser}>
          <Link href={"/login"}><Feather name='user' size={27} color="white"/></Link>
        </TouchableOpacity>
      </View>

      {/* TÍTULO DA PÁGINA */}
      <View style={styles.divider} />
      <Text style={styles.mostSoldTitle}>PRODUTO MAIS VENDIDO DA SEMANA:</Text>

      {/* IMAGEM LIMPADOR */}
      <Image source={require('./images/limpador.jpg')} style={styles.mostSoldImage} />

      {/* TÍTULO, DESCRIÇÃO E BOTÃO COMPRAR - LIMPADOR */}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>LIMPADOR DE VISEIRA PORTÁTIL</Text>
        <Text style={styles.productDescription}>Limpeza eficiente em qualquer lugar. Compacto e prático.</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      {/* TÍTULO "CONHEÇA MAIS ITENS" */}
      <Text style={styles.moreItemsTitle}>CONHEÇA MAIS ITENS:</Text>

      {/* IMAGEM CAPACETE */}
      <Image source={require('./images/capacete.jpg')} style={styles.moreItemsImage} />

      {/* TÍTULO, DESCRIÇÃO E BOTÃO COMPRAR - CAPACETE */}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>CAPACETE DE PROTEÇÃO</Text>
        <Text style={styles.productDescription}>Proteção e estilo para suas aventuras. Design confortável.</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      {/* LINHA DIVISÓRIA */}
      <View style={styles.divider} />

      {/* FOOTER COM BOTÃO "SOBRE NÓS" */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.aboutUsButton}>
          <Link href={"/aboutUs"} style={styles.aboutUsButtonText}>Sobre Nós</Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1b1063',
    paddingTop: 30,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonUser: {
    backgroundColor: 'grey',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44/2,
  },
  mostSoldTitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  mostSoldImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  productDetails: {
    padding: 20,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  moreItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  moreItemsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutUsButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
  },
  aboutUsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
