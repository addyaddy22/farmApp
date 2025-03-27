import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';
import { fetchFarmData } from '@/utils/database';

// Sample data (replace with actual data from your backend)
const sampleData = [
  {
    id: '1',
    farmer_name: 'John Doe',
    nation_id: '123456789',
    farm_type: 'Dairy',
    crop: 'Corn',
    location: 'New York',
  },
  {
    id: '2',
    farmer_name: 'Jane Smith',
    nation_id: '987654321',
    farm_type: 'Poultry',
    crop: 'Wheat',
    location: 'California',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(sampleData);
  const [farmers, setFarmers] = useState()


  //Function to retrieve famers data
  // const fetchFarmersCount = async () => {
  //   try {
  //     const userCounted = await countUsers();
  //     setUserCount(userCounted)
  //     console.log(`Total users: ${userCount}`);
  //   } catch (error) {
  //     console.error("Failed to fetch user count:", error);
  //   }
  // };

  const fetchedFarmData = async () => {
    try {
      const farmers_returned = await fetchFarmData();
      setFarmers(farmers_returned)
      console.log(`Farmers returned: ${farmers_returned}`);
    } catch (error) {
      console.error("Failed to fetch Number of Crops:", error);
    }
  };

  // const fetchCropTypeCount = async () => {
  //   try {
  //     const cropTypeCounted = await countCropTypes();
  //     setCropTypeCount(cropTypeCounted)
  //     console.log(`Total Crop Types: ${userCount}`);
  //   } catch (error) {
  //     console.error("Failed to fetch Crop Types:", error);
  //   }
  // };
  useFocusEffect(
    useCallback(() => {
      fetchedFarmData();
      // fetchCropCount();
      // fetchCropTypeCount();
    }, [])
  );
  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = sampleData.filter((item) =>
      item.farmer_name.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Render farm data card
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.farmer_name}</Text>
      <View style={styles.cardRow}>
        <MaterialIcons name="credit-card" size={16} color="#666" />
        <Text style={styles.cardText}>{item.nation_id}</Text>
      </View>
      <View style={styles.cardRow}>
        <MaterialIcons name="agriculture" size={16} color="#666" />
        <Text style={styles.cardText}>{item.farm_type}</Text>
      </View>
      <View style={styles.cardRow}>
        <MaterialIcons name="spa" size={16} color="#666" />
        <Text style={styles.cardText}>{item.crop}</Text>
      </View>
      <View style={styles.cardRow}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.cardText}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <Text style={styles.headerTitle}>Farm Management</Text>
        <Text style={styles.headerSubtitle}>Manage your farm data efficiently</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or location"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Total Farms</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Crops</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Locations</Text>
        </View>
      </View>

      {/* Farm Data List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add New Data Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/addData')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
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
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});