import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import axios from 'axios';
import { isOnline } from '@/utils/network';
import { syncFarmData } from '@/utils/sync';
import { insertFarmData } from '@/utils/database';

interface FarmData {
  farmer_name: string;
  nation_id: string;
  farm_type: string;
  crop: string;
  location: string;
}

export default function AddData() {
  const [formData, setFormData] = useState<FarmData>({
    farmer_name: "",
    nation_id: "",
    farm_type: "",
    crop: "",
    location: "",
  });

  const handleSubmit = async () => {
    try {
      if (await isOnline()) {
        // If online, submit directly to the backend
        await syncFarmData();
      } else {
        // If offline, store locally
        const dataSubmitted = await insertFarmData(formData);
        console.log(dataSubmitted)
        setFormData({
          farmer_name: "",
          nation_id: "",
          farm_type: "",
          crop: "",
          location: "",
        });
        Alert.alert("Success", "Data submitted successfully");

      }
      Alert.alert("Success", "Data submitted successfully");
      setFormData({
        farmer_name: "",
        nation_id: "",
        farm_type: "",
        crop: "",
        location: "",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to submit data");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Add Farm Data</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Enter the details below</ThemedText>
      </ThemedView>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Farmer's Name"
            placeholderTextColor="#999"
            value={formData.farmer_name}
            onChangeText={(text) => setFormData({ ...formData, farmer_name: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="credit-card" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nation ID"
            placeholderTextColor="#999"
            value={formData.nation_id}
            onChangeText={(text) => setFormData({ ...formData, nation_id: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="agriculture" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Farm Type"
            placeholderTextColor="#999"
            value={formData.farm_type}
            onChangeText={(text) => setFormData({ ...formData, farm_type: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="spa" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Crop"
            placeholderTextColor="#999"
            value={formData.crop}
            onChangeText={(text) => setFormData({ ...formData, crop: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="location-on" size={24} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#999"
            value={formData.location}
            onChangeText={(text) => setFormData({ ...formData, location: text })}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </LinearGradient>
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
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    marginTop: 30
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});