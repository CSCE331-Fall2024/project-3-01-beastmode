import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import api from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [signupInput, setSignUpInput] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (name, value) => {
    setSignUpInput({
      ...signupInput,
      [name]: value,
    });
    if (errorMessage) {
      setErrorMessage(''); 
    }
  };

  const validateInputs = () => {
    if (!signupInput.email) {
      setErrorMessage('Email is required.');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupInput.email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }

    if (!signupInput.first_name || !signupInput.last_name) {
      setErrorMessage('First and last names are required.');
      return false;
    }

    if (!signupInput.password) {
      setErrorMessage('Password is required.');
      return false;
    } else if (signupInput.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    if (signupInput.password !== signupInput.confirm_password) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      setLoading(true);
      try {
        const response = await api.post('/auth/signup/customer', signupInput);
        if (response.status === 200) {
          Alert.alert('Success', 'Account created successfully!');
          navigation.navigate('Login');
        } else {
          setErrorMessage(response.data.message || 'Registration failed.');
        }
      } catch (error) {
        setErrorMessage('An error occurred during registration.');
        console.error('Registration Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={signupInput.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={signupInput.first_name}
        onChangeText={(text) => handleInputChange('first_name', text)}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={signupInput.last_name}
        onChangeText={(text) => handleInputChange('last_name', text)}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={signupInput.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={signupInput.confirm_password}
        onChangeText={(text) => handleInputChange('confirm_password', text)}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Log in here
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: '#333',
    width: '80%',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#a3080c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  loginLink: {
    color: '#a3080c',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
