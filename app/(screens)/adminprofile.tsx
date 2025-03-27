import { StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { clearUserData } from '@/utils/contants';

export default function AdminProfile() {

  const [loggeduser, setLoggedUser] = useState<{ username: string; firstname: string; email: string, role: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loadUserDetails = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setLoggedUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await clearUserData();
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("Logged out User successfully");
      Alert.alert("Logged out User successfully");
      router.push('/')
    }
    catch (error) {
      Alert.alert("Error", "Invalid credentials.....");
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadUserDetails();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (123) 456-7890',
    location: 'New York, USA',
    bio: 'Farmer | Data Collector',
    profilePic: require('../../assets/images/profie-pic.jpg'), // Replace with your profile picture path
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={user.profilePic}
          style={styles.profileImage}
        />
        <ThemedText type="title" style={styles.profileName}>{loggeduser?.firstname}</ThemedText>
        <ThemedText style={styles.profileBio}>ROLE: {loggeduser?.role}</ThemedText>
      </View>

      {/* User Information Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Personal Information</ThemedText>
        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={20} color="#666" />
          <ThemedText style={styles.infoText}>{loggeduser?.email}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <ThemedText style={styles.infoText}>{user.phone}</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <ThemedText style={styles.infoText}>{user.location}</ThemedText>
        </View>
      </ThemedView>

      {/* Settings Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Settings</ThemedText>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={20} color="#666" />
          <ThemedText style={styles.settingText}>Notification Settings</ThemedText>
          <MaterialIcons name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="security" size={20} color="#666" />
          <ThemedText style={styles.settingText}>Privacy & Security</ThemedText>
          <MaterialIcons name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <FontAwesome name="language" size={20} color="#666" />
          <ThemedText style={styles.settingText}>Language</ThemedText>
          <MaterialIcons name="chevron-right" size={20} color="#666" />
        </TouchableOpacity>
      </ThemedView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 70
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});