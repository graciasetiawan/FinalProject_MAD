import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KosCard from '../../components/KosCard';
import FilterModal, { FilterOptions } from '../../components/FilterModal';
import { mockKosList } from '../../constants/mockData';
import { useFavorites } from '../../hooks/useFavorites';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    facilities: [],
    type: null,
    maxPrice: 5000000
  });

  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredKos = mockKosList.filter(kos => {
    // Search by location
    if (searchQuery && !kos.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (filters.type && kos.type !== filters.type) {
      return false;
    }
    
    // Filter by maxPrice
    const numericPrice = parseInt(kos.price.replace(/[^0-9]/g, ''));
    if (numericPrice > filters.maxPrice) {
      return false;
    }
    
    // Filter by facilities
    if (filters.facilities.length > 0) {
      const hasAllFacilities = filters.facilities.every(f => kos.facilities.includes(f));
      if (!hasAllFacilities) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Halo, Pencari Kost!</Text>
          <Text style={styles.subtitle}>Temukan hunian nyamanmu hari ini</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#747d8c" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari berdasarkan lokasi..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#a4b0be"
            />
          </View>
          <Pressable style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color="#ffffff" />
          </Pressable>
        </View>

        <FlatList
          data={filteredKos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={60} color="#dfe4ea" />
              <Text style={styles.emptyText}>Tidak ada kost yang sesuai kriteria.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <KosCard
              kos={{ ...item, isFavorite: isFavorite(item.id) }}
              onToggleFavorite={toggleFavorite}
            />
          )}
        />
        
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={setFilters}
          initialFilters={filters}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2f3542',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#747d8c',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#2f3542',
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#747d8c',
  },
});
