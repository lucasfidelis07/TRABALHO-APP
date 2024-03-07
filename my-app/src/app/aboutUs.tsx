import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AppSobreMim() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER DA PÁGINA */}
      <View style={styles.header}>
        <Text style={styles.username}>Seja Bem-Vindo</Text>
        <TouchableOpacity style={styles.buttonUser}>
          <Feather name='user' size={27} color="white"/>
        </TouchableOpacity>
      </View>

      {/* TÍTULO DA PÁGINA */}
      <Text style={styles.pageTitle}>SOBRE A DUAS RODAS MOTOSPORT</Text>

      {/* CONTEÚDO SOBRE A EMPRESA */}
      <View style={styles.content}>
        <Text style={styles.description}>
          A Duas Rodas Motosport é uma loja especializada em artigos para motos,
          oferecendo uma ampla variedade de produtos de qualidade para entusiastas e motociclistas.
          Nossa missão é fornecer os melhores equipamentos para garantir uma experiência segura e emocionante.
        </Text>
      </View>

      {/* LINHA DIVISÓRIA */}
      <View style={styles.divider} />

      {/* FOOTER COM BOTÃO "VOLTAR" */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.goBackButton}>
          <Text style={styles.goBackButtonText}>Voltar</Text>
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
  pageTitle: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#333',
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
  goBackButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
  },
  goBackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
