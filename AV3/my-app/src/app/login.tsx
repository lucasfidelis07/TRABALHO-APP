import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Link } from 'expo-router';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../src/config/firebase-config';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

export default function AppLogin() {
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      Alert.alert('Login bem-sucedido!', 'Seja bem-vindo ao Painel.');
    } catch (error:any) {
      Alert.alert('Erro de login', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* TELA DE LOGIN */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.loginContainer}>
            {/* E-MAIL */}
            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={[styles.input, { borderColor: touched.email && errors.email ? 'red' : '#ccc' }]}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* SENHA */}
            <Text style={styles.inputLabel}>Senha:</Text>
            <TextInput
              style={[styles.input, { borderColor: touched.password && errors.password ? 'red' : '#ccc' }]}
              placeholder="Digite sua senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* BOTÃO DE LOGIN */}
            <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
              <Text style={styles.loginButtonText}>LOGAR</Text>
            </TouchableOpacity>

            {/* BOTÃO DE CADASTRO */}
            <TouchableOpacity style={styles.registerButton}>
              <Link href="/register">
                <Text style={styles.registerButtonText}>Não tem cadastro? Cadastrar-se agora!</Text>
              </Link>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* FOOTER COM BOTÕES DE NAVEGAÇÃO */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/">
            <View style={styles.footerItem}>
              <Feather name="home" size={24} color="#FF6D00" />
              <Text style={styles.footerText}>Home</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/department">
            <View style={styles.footerItem}>
              <Feather name="grid" size={24} color="#FF6D00" />
              <Text style={styles.footerText}>Departamentos</Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/login">
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
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  loginContainer: {
    paddingVertical: 20,
  },
  inputLabel: {
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: '#FF6D00',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
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
  footerText: {
    marginTop: 5,
    color: '#FF6D00',
  },
  footerItem: {
    alignItems: 'center',
  }
});
