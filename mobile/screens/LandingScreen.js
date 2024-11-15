import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import ReusableButton from '../components/ReusableButton'; 

const { height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }} 
      style={styles.background}
    >
      <View style={styles.overlayContainer}>
        <Image source={require('../assets/beast-logo.png')} style={styles.logo} />
        
        <Text style={styles.title}>Beastmode x Panda Express</Text>
        <Text style={styles.subtitle}>Start Earning Beast Points Today!</Text>
        
        <View style={styles.buttonContainer}>
          <ReusableButton
            onPress={() => navigation.navigate('Login')}
            text="Login"
          />
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
    paddingTop: height * 0.25, 
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff', 
  },
  subtitle: {
    fontSize: 16,
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%', 
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

export default LandingScreen;
