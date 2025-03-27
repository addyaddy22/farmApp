import { StyleSheet, Image, Platform, Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import CustomHeader from "../components/CustomHeader";
import { MaterialIcons } from '@expo/vector-icons';
import { deleteDatabase, fetchUser, initDatabase, insertUser } from "../utils/database";
import { isOnline, onNetworkChange } from '@/utils/network';
import { syncFarmData } from '@/utils/sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUserData } from '@/utils/contants';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   initDatabase(); // Initialize the database when the app starts
  // }, []);

  useEffect(() => {
    const initializeAndSync = async () => {
      console.log("......Preparing to initialize DB");
      // await deleteDatabase(); // Delete the existing database
      await initDatabase(); // Reinitialize the database
      console.log("Database initialized successfully");

      // Sync data when the app starts
      if (await isOnline()) {
        await syncFarmData();
      }
    };

    initializeAndSync();

    // Sync data when the device comes online
    const unsubscribe = onNetworkChange((isConnected) => {
      if (isConnected) {
        syncFarmData();
      }
    });

    // Cleanup listener
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    console.log('Button login clicked...')

    try {
      const user = await fetchUser(username, password);
      console.log(username)
      console.log(password)


      if (user) {
        console.log("User logged in:", user);

        // Check the user's role and navigate accordingly
        if (user.role === "clerk") {
          await clearUserData();
          await AsyncStorage.setItem("user", JSON.stringify(user));
          console.log("User data saved successfully");
          router.push('/home')
        } else if (user.role === "admin") {
          await clearUserData();
          await AsyncStorage.setItem("user", JSON.stringify(user));
          console.log("User data saved successfully");
          router.push('/adminhome')
        } else {
          Alert.alert("Error", "Invalid role");
        }
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Invalid credentials.....");
    }
  };

  const handleRegister = async () => {
    console.log('Button Register clicked...')

    try {
      router.push('/register')

    }
    catch (error) {
      Alert.alert("Error", "Error Trying Registering new user.....");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../assets/images/farm_logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
});