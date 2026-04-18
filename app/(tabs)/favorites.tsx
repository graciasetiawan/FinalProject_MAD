import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KosCard from '../../components/KosCard';
import { useFavorites } from '../../hooks/useFavorites';

export default function FavoritesScreen() {
  const { getFavoriteKos, toggleFavorite, isFavorite } = useFavorites();
  const favoriteKos = getFavoriteKos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Kost Favoritmu</Text>
          <Text style={styles.subtitle}>Tempat kost impian yang kamu simpan</Text>
        </View>

        <FlatList
          data={favoriteKos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-dislike-outline" size={60} color="#dfe4ea" />
              <Text style={styles.emptyText}>Belum ada kost favorit.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <KosCard
              kos={{ ...item, isFavorite: isFavorite(item.id) }}
              onToggleFavorite={toggleFavorite}
            />
          )}
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2f3542',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#747d8c',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#747d8c',
  },
});
