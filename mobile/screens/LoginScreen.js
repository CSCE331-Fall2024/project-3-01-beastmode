import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import api from '../services/api';
import ReusableButton from '../components/ReusableButton';
import InputField from '../components/InputField';
import BackButton from '../components/BackButton'; 

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await api.post('/auth/login/customer', { email, password });

        if (response.status === 200 && response.data.success) {
          const customerId = response.data.customer_id;
          Alert.alert('Login Successful', `Welcome, ${email}!`);
          navigation.navigate('Home', { customerId }); 
        } else {
          setErrorMessage(response.data.message || 'Invalid email or password.');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'An error occurred during login.';
        setErrorMessage(errorMessage);
        console.error('Login Error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Please enter both email and password.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }}
      style={styles.background}
    >
      <BackButton onPress={() => navigation.goBack()} /> 

      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Welcome Back!</Text>

        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#6200EE" />
          ) : (
            <ReusableButton
              onPress={handleLogin}
              text="Login"
            />
          )}
        </View>

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            Register here
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.34, 
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  registerText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  registerLink: {
    color: '#a3080c',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
