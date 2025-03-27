import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useFocusEffect } from 'expo-router'; // Import Expo Router
import { countCrops, countCropTypes, countUsers } from '@/utils/database';
import { useCallback, useEffect, useState } from 'react';

export default function AdminHome() {

  const [userCount, setUserCount] = useState(0)
  const [cropCount, setCropCount] = useState(0)
  const [cropTypeCount, setCropTypeCount] = useState(0)



  const fetchUserCount = async () => {
    try {
      const userCounted = await countUsers();
      setUserCount(userCounted)
      console.log(`Total users: ${userCount}`);
    } catch (error) {
      console.error("Failed to fetch user count:", error);
    }
  };

  const fetchCropCount = async () => {
    try {
      const cropsCounted = await countCrops();
      setCropCount(cropsCounted)
      console.log(`Total Crops: ${userCount}`);
    } catch (error) {
      console.error("Failed to fetch Number of Crops:", error);
    }
  };

  const fetchCropTypeCount = async () => {
    try {
      const cropTypeCounted = await countCropTypes();
      setCropTypeCount(cropTypeCounted)
      console.log(`Total Crop Types: ${userCount}`);
    } catch (error) {
      console.error("Failed to fetch Crop Types:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserCount();
      fetchCropCount();
      fetchCropTypeCount();
    }, [])
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Welcome, Admin</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Manage your platform with ease</ThemedText>
      </ThemedView>

      {/* Quick Actions Grid */}
      <ThemedView style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard} >
          <MaterialIcons name="people" size={30} color="#4CAF50" />
          <ThemedText style={styles.actionText}>Manage Users</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} >
          <FontAwesome name="bar-chart" size={30} color="#FF9800" />
          <ThemedText style={styles.actionText}>Analytics</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/adminprofile')}>
          <Ionicons name="person" size={30} color="#2196F3" />
          <ThemedText style={styles.actionText}>Admin Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/addoptions')}>
          <MaterialIcons name="add-circle" size={30} color="#F44336" />
          <ThemedText style={styles.actionText}>Add Options</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Recent Activity Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
        <View style={styles.activityItem}>
          <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
          <ThemedText style={styles.activityText}>User "John Doe" was added.</ThemedText>
        </View>
        <View style={styles.activityItem}>
          <MaterialIcons name="warning" size={20} color="#FF9800" />
          <ThemedText style={styles.activityText}>3 pending approvals.</ThemedText>
        </View>
        <View style={styles.activityItem}>
          <MaterialIcons name="error" size={20} color="#F44336" />
          <ThemedText style={styles.activityText}>System update required.</ThemedText>
        </View>
      </ThemedView>

      {/* Statistics Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Platform Statistics</ThemedText>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{userCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Users</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{cropCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Total crops</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{cropTypeCount}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Crop Types</ThemedText>
          </View>
        </View>
      </ThemedView>
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
    marginTop: 30,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '30%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});