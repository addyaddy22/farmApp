import { StyleSheet, Image, Platform, Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { insertUser, registerUser } from '@/utils/database';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function Register() {

  const [username, setUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");


  const handleRegister = async () => {
    console.log('Button Register clicked...')

    try {

      const user = await registerUser(username, firstname, password, email, role);

      if (user) {
        console.log(user)
        Alert.alert("Success", "Successfully Registered new user.....");
        router.push('/')

      } else {
        alert('Failed to register');
      }
    }
    catch (error) {
      Alert.alert("Error", "Error Registering new user.....");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/farm_logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="First name"
            placeholderTextColor="#999"
            value={firstname}
            onChangeText={setfirstname}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="mail" size={24} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#555" />
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            <Picker.Item label="Clerk" value="clerk" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green button
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#000",
  },
});