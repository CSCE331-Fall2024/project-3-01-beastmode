import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default', autoCapitalize = 'sentences', placeholderTextColor = '#aaa' }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default InputField;
