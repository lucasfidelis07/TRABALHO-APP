import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
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
      {/* TELA DE REGISTRO */}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleRegister}
        validationSchema={registerValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.registerContainer}>
            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={[styles.input, { borderColor: touched.email && errors.email ? 'red' : '#ccc' }]}
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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

            <TouchableOpacity style={styles.registerButton} onPress={() => handleSubmit()}>
              <Text style={styles.registerButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* BOTÕES DE NAVEGAÇÃO */}
      <View style={styles.navigationButtons}>
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
  registerContainer: {
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
  navigationButtons: {
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
