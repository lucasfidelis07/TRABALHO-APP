import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Link, useRouter } from 'expo-router';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

export default function AppLogin() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

      if (userCredential.user) {
        // Se o login for bem-sucedido, redireciona para a página inicial (index)
        router.push('/');
        Alert.alert('Login bem-sucedido!', 'Seja bem-vindo ao Painel.');
      }
    } catch (error: any) {
      Alert.alert('Erro de login', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área de Login</Text>
      {/* TELA DE LOGIN */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.loginContainer}>
            {/* E-MAIL */}
            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.inputError : styles.inputNormal]}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* SENHA */}
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

            {/* BOTÃO DE LOGIN */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={(event: GestureResponderEvent) => handleSubmit()}
            >
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
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/department">
            <View style={styles.footerItem}>
              <Feather name="grid" size={24} color="#FF6D00" />
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}>
          <Link href="/login">
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
  loginContainer: {
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
  footerItem: {
    alignItems: 'center',
  },
});
