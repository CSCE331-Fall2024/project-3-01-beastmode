import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import api from '../services/api';
import ReusableButton from '../components/ReusableButton'; 
import InputField from '../components/InputField'; 
import BackButton from '../components/BackButton'; 

const { height } = Dimensions.get('window');

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
          Alert.alert('Success', response.data.message || 'Account created successfully!');
          navigation.navigate('Login');
        } else {
          setErrorMessage(response.data.message || 'Registration failed.');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred during registration.');
        }
        console.error('Registration Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }}
      style={styles.background}
    >
      <BackButton onPress={() => navigation.goBack()} /> 

      <ScrollView contentContainerStyle={styles.overlayContainer}>
        <Text style={styles.title}>Create an Account</Text>

        <InputField
          placeholder="Email"
          value={signupInput.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          placeholder="First Name"
          value={signupInput.first_name}
          onChangeText={(text) => handleInputChange('first_name', text)}
        />

        <InputField
          placeholder="Last Name"
          value={signupInput.last_name}
          onChangeText={(text) => handleInputChange('last_name', text)}
        />

        <InputField
          placeholder="Password"
          value={signupInput.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />

        <InputField
          placeholder="Confirm Password"
          value={signupInput.confirm_password}
          onChangeText={(text) => handleInputChange('confirm_password', text)}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#6200EE" />
          ) : (
            <ReusableButton
              onPress={handleSubmit}
              text="Register"
            />
          )}
        </View>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Log in here
          </Text>
        </Text>
      </ScrollView>
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
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.2,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
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
  loginText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  loginLink: {
    color: '#a3080c',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
