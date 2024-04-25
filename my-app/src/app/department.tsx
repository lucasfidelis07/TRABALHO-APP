import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Department() {
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
      
      <View style={styles.selectCategoryContainer}>
        <Text style={styles.selectCategoryText}>SELECIONE ABAIXO A CATEGORIA:</Text>
      </View>
      
      {/* CATEGORIAS */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
            <Link href={"/helmets"}>
                <Text style={styles.categoryButtonText}>CAPACETES</Text>
            </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryButtonText}>ACESSÓRIOS</Text>
        </TouchableOpacity>
      </View>

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
  selectCategoryContainer: {
    alignItems: 'center', 
    marginBottom: 20, 
  },
  selectCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  categoryButtonText: {
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 5,
    color: '#FF6D00',
  },
  footerItem: {
    alignItems: 'center',
  }
});
