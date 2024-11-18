import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>{'<'} Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BackButton;
