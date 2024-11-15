import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity,
  Image, 
  ImageBackground, 
  Dimensions,
} from 'react-native';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import QRCode from 'react-native-qrcode-svg'; 

const { height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => { 
  const { customerId } = route.params;
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCustomerInfo = async () => {
    try {
      const response = await api.get(`/auth/login/customer/info/${customerId}`);
      if (response.status === 200 && response.data.success) {
        setCustomerInfo(response.data.data);
      } else {
        setErrorMessage(response.data.message || 'Failed to fetch customer information.');
      }
    } catch (err) {
      setErrorMessage('An error occurred while fetching customer information.');
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerInfo();
  }, [customerId]);

  const handleRetry = () => {
    setLoading(true);
    setErrorMessage('');
    fetchCustomerInfo();
  };

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }} 
        style={styles.background}
      >
        <View style={styles.overlay} />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a3080c" /> 
        </View>
      </ImageBackground>
    );
  }

  if (errorMessage) {
    return (
      <ImageBackground
        source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }} 
        style={styles.background}
      >
        <View style={styles.overlay} />

        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  const qrData = JSON.stringify({
    customer_id: customerInfo.customer_id,
    email: customerInfo.email,
    first_name: customerInfo.first_name,
    last_name: customerInfo.last_name,
    beast_points: customerInfo.beast_points,
  });

  const handleLogout = async () => {
    navigation.navigate('Landing'); 
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/OO0tL1D.jpeg' }} 
      style={styles.background}
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Header with Logo and Logout Button */}
      <View style={styles.header}>
        {/* BeastMode Logo */}
        <Image 
          source={require('../assets/beast-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Icon name="logout" size={24} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome {customerInfo.first_name} {customerInfo.last_name}!
        </Text>
        
        {/* Beast Points Display */}
        <View style={styles.pointsContainer}>
          <Icon name="star" size={30} color="#FFD700" style={styles.icon} />
          <View>
            <Text style={styles.pointsLabel}>Beast Points</Text>
            <Text style={styles.pointsValue}>{customerInfo.beast_points}</Text>
          </View>
        </View>

        {/* Display QR Code */}
        <View style={styles.qrContainer}>
            <QRCode
                value={qrData}
                size={200}
                color="#FFFFFF" 
                backgroundColor="#a3080c" 
            />
        </View>

        {/* Instructional Text for QR Code */}
        <View style={styles.instructionContainer}>
          <Icon name="information-outline" size={20} color="#FFFFFF" style={styles.instructionIcon} />
          <Text style={styles.instructionText}>
            Please scan this QR code at the kiosk to proceed.
          </Text>
        </View>
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
  overlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  header: {
    width: '100%',
    paddingVertical: 10, 
    paddingHorizontal: 10,
    backgroundColor: 'rgba(163, 8, 12, 0.8)', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2, 
  },
  logo: {
    width: 100, 
    height: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7f0b15',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.15, 
    alignItems: 'center',
    zIndex: 1, 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#fff', 
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff', 
    textAlign: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a3080c', 
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  icon: {
    marginRight: 10,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  pointsValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    backgroundColor: '#a3080c', 
    padding: 10,
    borderRadius: 15,
  },
  instructionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  instructionIcon: {
    marginRight: 8,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  errorText: {
    color: '#ffcccc', 
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#a3080c', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
