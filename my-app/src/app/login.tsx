// AppLogin.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

export default function AppLogin() {
  const handleLogin = (values: { email: string; password: string }) => {
    if (values.email === 'painel@painel.com' && values.password === 'senha123') {
      Alert.alert('Login bem-sucedido!', 'Seja bem-vindo ao Painel.');
    } else {
      Alert.alert('Erro de login', 'E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER DA PÁGINA */}
      <View style={styles.header}>
        <Text style={styles.username}>Bem-Vindo</Text>
        <TouchableOpacity style={styles.buttonUser}>
          <Feather name='user' size={27} color="white"/>
        </TouchableOpacity>
      </View>

      {/* TELA DE E-MAIL */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Digite seu e-mail:</Text>
            <TextInput
              style={[styles.input, { borderColor: touched.email && errors.email ? 'red' : '#ccc' }]}
              placeholder="E-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* TELA DE SENHA */}
            <Text style={styles.loginTitle}>Digite sua senha:</Text>
            <TextInput
              style={[styles.input, { borderColor: touched.password && errors.password ? 'red' : '#ccc' }]}
              placeholder="Senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* BOTÃO LOGAR */}
            <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
            <Text style={styles.loginButtonText}>LOGAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
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
  loginContainer: {
    padding: 20,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
