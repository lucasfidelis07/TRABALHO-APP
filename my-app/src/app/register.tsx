import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../src/config/firebase-config';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const registerValidationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
});

export default function Register() {
  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      Alert.alert('Registro bem-sucedido!', 'Usuário registrado com sucesso.');
    } catch (error: any) {
      Alert.alert('Erro de registro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área de Registro</Text>
      {/* TELA DE REGISTRO */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={registerValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.registerContainer}>
            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.inputError : styles.inputNormal]}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.inputLabel}>Senha:</Text>
            <TextInput
              style={[styles.input, touched.password && errors.password ? styles.inputError : styles.inputNormal]}
              placeholder="Digite sua senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.registerButton} onPress={() => handleSubmit()}>
              <Text style={styles.registerButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* BOTÕES DE NAVEGAÇÃO */}
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
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'center', // Alinha o conteúdo verticalmente no centro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerContainer: {
    paddingVertical: 20,
    marginVertical: 50, // Adiciona espaçamento para cima e para baixo
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  inputNormal: {
    borderColor: '#CCCCCC',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#FF6D00',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
